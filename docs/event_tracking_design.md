# Event Tracking System Design: Google Analytics + Celonis
AstroBunny (Tarot & Numerology Automation)

This document outlines the architecture for a dual-purpose event tracking system designed to log user behavior for both **Conversion Tracking (Google Analytics)** and **Process Mining (Celonis)**.

---

## 1. Unified Event Schema
To ensure data consistency between frontend tracking (GA) and backend mining (Celonis), we define a single unified event payload:

| Field Name | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `case_id` | String | A unique session/journey identifier (UUID) tying steps together. | `sess_8f92a3b1` |
| `event_name` | String | Standardized name of the action taken. | `calculator_used` |
| `user_id` | String | User's Email or Database ID (can be null for guests). | `user@email.com` |
| `timestamp` | Datetime| ISO 8601 Timestamp of when the event occurred. | `2026-03-22T15:30:00Z` |
| `event_properties`| JSON | Extra context (service type, result output, UTM tags). | `{"service": "numerology", "source": "fb_ads"}` |

---

## 2. Key Events for the Funnel
Tracking the complete lifecycle of a user acquisition funnel:

1. **`page_view`**: Fired when a user loads a landing page or significant view.
2. **`calculator_used`**: Fired when the user inputs data into the Numerology calculator and clicks submit.
3. **`tarot_started`**: Fired when a user clicks to draw a Tarot card.
4. **`email_signup` / `lead_captured`**: Fired when the user submits their email to unlock full results/reports.
5. **`report_generated`**: Backend fires this when the PDF or detailed HTML report is successfully created and presented to the user.
6. **`checkout_started`** (Optional): If premium reports are added.

---

## 3. How to Send & Store Events

### A. Google Analytics (Frontend/gtag.js)
On the React Frontend, you trigger GA events using the `window.gtag` API. This gives you instant real-time data for your Google Ads / Analytics dashboards.

```javascript
// Example: Tracking a calculator usage event
const trackGAEvent = (eventName, properties) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
};

// Usage when someone clicks "Calculate"
trackGAEvent('calculator_used', {
  service_type: 'numerology',
  user_id: userEmail || 'guest',
  session_id: sessionUUID // Ties it to Celonis case_id
});
```

### B. Backend Storage for Celonis (Node.js + MySQL)
To keep a reliable, immutable log of the process flow for Celonis, the React frontend should also make an API call to your Node.js backend to log the event into MySQL.

**React (API Call):**
```javascript
axios.post('/api/events/track', {
  case_id: sessionUUID,
  event_name: 'calculator_used',
  user_id: userEmail,
  timestamp: new Date().toISOString(),
  properties: { service: 'numerology' }
});
```

**Node.js (Express Route):**
```javascript
router.post('/track', async (req, res) => {
  const { case_id, event_name, user_id, timestamp, properties } = req.body;
  await db.query(
    "INSERT INTO event_logs (case_id, activity, user_id, timestamp, properties) VALUES (?, ?, ?, ?, ?)",
    [case_id, event_name, user_id, timestamp, JSON.stringify(properties)]
  );
  res.status(200).send('Logged');
});
```

---

## 4. Database Table Design (Celonis Ready)
Celonis requires an Event Log table consisting of at least 3 main columns: **Case ID**, **Activity (Event Name)**, and **Timestamp**.

**MySQL Table (`event_logs`)**
```sql
CREATE TABLE event_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    case_id VARCHAR(50) NOT NULL,       -- Matches Celonis "Case ID" requirement
    activity VARCHAR(100) NOT NULL,     -- Matches Celonis "Activity Name"
    timestamp DATETIME NOT NULL,        -- Matches Celonis "Timestamp"
    user_id VARCHAR(100),               -- (Optional) For grouping/filtering
    properties JSON,                    -- (Optional) Extra context
    INDEX(case_id),
    INDEX(timestamp)
);
```

---

## 5. Exporting Data (SQL → CSV) for Celonis
Celonis ingests data via CSV uploads or direct DB connections. If using CSV, you can export the exact format needed using the backend `json2csv` library or a simple SQL query.

**MySQL Query to Export:**
```sql
SELECT 
    case_id AS "Case ID", 
    activity AS "Activity Name", 
    DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS "Timestamp",
    user_id AS "User",
    JSON_UNQUOTE(JSON_EXTRACT(properties, '$.service')) AS "Service Type"
FROM event_logs
ORDER BY timestamp ASC
INTO OUTFILE '/var/lib/mysql-files/celonis_export.csv'
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n';
```
*(Or use the `json2csv` Node.js script we built in the Admin Panel to create a download button for `GET /api/admin/events/export`).*

---

## 6. Mapping Analytics vs Process Flow

| Platform | Strengths | How to Use |
| :--- | :--- | :--- |
| **Google Analytics** | Aggregated Metrics, Demographics, Conversion Rates. | Map `calculator_used` → `email_signup` as a Conversion Goal Funnel. You look at *how many* people converted, drop-off percentages, and Traffic Source (UTM). |
| **Celonis (Process Mining)** | Sequence Analysis, Bottlenecks, Loop detections. | Map the precise path of a single `case_id`. Celonis visually draws the flowchart. You discover *unexpected behaviors* (e.g., users loop between `tarot_started` and `page_view` 5 times before `email_signup`, indicating confusion or indecision). |

---

## 7. Example User Journey Walkthrough

### Scenario: A user discovers the site via Facebook Ads.

1. **Visit Landing Page** 
   - GA: Fired `page_view` (source: fb_ads).
   - MySQL (Celonis): `case_id: "sess_xyz", activity: "page_view", timestamp: "10:00:00"`

2. **User enters birthdate & clicks "Luận Giải"**
   - GA: Fired `calculator_used`.
   - MySQL (Celonis): `case_id: "sess_xyz", activity: "calculator_used", timestamp: "10:02:15"`

3. **Results are blurred. User submits Email to unlock.**
   - GA: Fired `email_signup` (Goal achieved!).
   - MySQL (Celonis): `case_id: "sess_xyz", activity: "email_signup", user_id: "anna@gmail.com", timestamp: "10:04:00"`
   *(Note: The `case_id` now gets permanently associated with "anna@gmail.com" in the DB).*

4. **System generates the full Numerical Report.**
   - GA: Fired `report_generated`.
   - MySQL (Celonis): `case_id: "sess_xyz", activity: "report_generated", timestamp: "10:04:10"`

**Outcome:**
- **In GA:** You see 1 Conversion from FB Ads, taking 4 minutes.
- **In Celonis:** You see the "Happy Path" flowchart: `page_view → calculator_used (`2m15s` delay) → email_signup (`1m45s` delay) → report_generated`. If you notice the delay between Calculator and Email is too long across 1000 users, you know you need to optimize the Email Signup popup UI to be faster/clearer!
