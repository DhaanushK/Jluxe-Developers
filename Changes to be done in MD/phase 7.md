# JLUXE — Phase 7: Leads, Enquiries & Site Visits
## GitHub Copilot / AI Coding Agent Implementation Specification

> **Project:** JLUXE Developers Website  
> **Phase:** 7 — Leads, Enquiries & Site Visits  
> **Status:** NEXT IMPLEMENTATION PHASE  
> **Previous Phase:** Phase 6 — CMS + Database  
> **Scope:** Customer enquiry capture, lead persistence, contextual source tracking and site-visit request foundation  
> **Out of Scope:** Full Admin Dashboard / CRM UI, advanced automation, appointment calendar, payments

---

# 1. PURPOSE

Phase 7 introduces the first real customer-conversion layer of the JLUXE website.

The website should move from:

```text
CONTENT
  ↓
PROJECTS / SERVICES / PROPERTIES
```

to:

```text
CONTENT
  ↓
CUSTOMER INTERACTION
  ↓
ENQUIRY
  ↓
LEAD
  ↓
FOLLOW-UP
  ↓
SITE VISIT / MEETING
```

The objective is to create a secure, reusable enquiry and lead foundation that can later be consumed by the Phase 9 Admin Dashboard.

Do not build the complete CRM/admin interface in this phase.

---

# 2. CRITICAL IMPLEMENTATION RULE

Before changing anything:

1. Inspect the existing repository.
2. Inspect Phase 5 real-estate architecture.
3. Inspect Phase 6 database/repository architecture.
4. Reuse the existing database and repository patterns.
5. Do not introduce a second database.
6. Do not bypass the Phase 6 data-access layer.
7. Do not put database queries directly inside React components.
8. Do not expose server credentials to the browser.
9. Do not invent company contact information.
10. Do not create fake leads or fake enquiries as production content.
11. Preserve all completed Phase 1–6 work.
12. Run migrations/build/type checks after implementation.

---

# 3. CURRENT ECOSYSTEM SCOPE

JLUXE currently contains FOUR ecosystems:

```text
1. JLUXE Real Estate
2. JLUXE Business Solutions
3. JLUXE Talent & Training
4. JLUXE Interiors & Design
```

Do NOT add JLUXE Boutique.

---

# 4. PHASE 7 OBJECTIVES

Implement the foundation for:

- Contact enquiry submission
- Service enquiries
- Ecosystem enquiries
- Project enquiries
- Property enquiries
- Plot enquiries
- Contextual source tracking
- Lead persistence
- Lead status
- Lead assignment foundation
- Site-visit requests
- Server-side validation
- Spam/abuse protection foundations
- Safe success/error handling
- Repository/data-access functions
- Server actions/API handlers where appropriate
- Notification foundation where officially configured

Do NOT implement the full CRM dashboard yet.

---

# 5. CUSTOMER JOURNEY

The intended journey is:

```text
Visitor
   ↓
Discovers JLUXE
   ↓
Views Ecosystem / Service / Project / Property / Plot
   ↓
Clicks CTA
   ↓
Enquiry Form
   ↓
Validation
   ↓
Database
   ↓
Lead / Enquiry
   ↓
Follow-up
   ↓
Site Visit / Meeting
   ↓
Future Conversion
```

Do not assume every enquiry is a real-estate enquiry.

Business Solutions, Talent & Training and Interiors & Design must have appropriate contextual enquiry paths.

---

# 6. LEAD VS ENQUIRY

Keep the concepts distinct.

## Enquiry

The customer's submitted interaction/request.

Example:

```text
"I want more information about this project."
```

## Lead

The business-level customer/contact record associated with the enquiry.

Example:

```text
Name
Phone
Email
Company
Requirement
Source
Status
```

Relationship:

```text
Lead
  │
  └── Enquiries
```

A lead may submit multiple enquiries over time.

Do not duplicate the complete lead record for every enquiry.

---

# 7. LEAD DATA MODEL

Use the Phase 6 database architecture.

Suggested fields:

```text
id
name
phone
email
company
requirement
ecosystem
service
projectId
propertyId
plotId
preferredLocation
budget
source
status
assignedTo
createdAt
updatedAt
```

Do not require fields that are irrelevant to non-real-estate enquiries.

---

# 8. LEAD STATUS SYSTEM

Use the approved lifecycle:

```text
NEW
CONTACTED
INTERESTED
SITE_VISIT
MEETING
NEGOTIATION
BOOKED
CLOSED
```

The statuses represent a progression foundation.

Do not build a visual Kanban CRM in Phase 7.

That belongs to the future Admin/CRM interface.

---

# 9. ENQUIRY DATA MODEL

Suggested fields:

```text
id
leadId
ecosystemId
serviceId
projectId
propertyId
plotId
subject
message
source
pageUrl
utmSource
utmMedium
utmCampaign
createdAt
updatedAt
```

Additional tracking fields may be added only when justified.

Do not collect unnecessary personal information.

---

# 10. SOURCE TRACKING

Every enquiry should attempt to capture its context.

Possible source values:

```text
CONTACT
ECOSYSTEM
SERVICE
PROJECT
PROPERTY
PLOT
CAREER
OTHER
```

Example:

```text
source = PROPERTY
propertyId = ...
pageUrl = /real-estate/properties/example-property
```

This allows future teams to understand where the enquiry originated.

Do not infer information that the user did not provide.

---

# 11. CONTEXTUAL ENQUIRY

Forms should understand their context.

### Project page

```text
Interested Project
= Project X
```

### Property page

```text
Interested Property
= Property Y
Project
= Project X
```

### Plot page

```text
Interested Plot
= Plot 12
Project
= Project X
```

### Service page

```text
Interested Service
= Digital Marketing
Ecosystem
= Business Solutions
```

### Contact page

```text
General Enquiry
```

The user should not need to manually type information already known from the page.

---

# 12. ENQUIRY FORM ARCHITECTURE

Create a reusable enquiry form.

Possible component:

```text
EnquiryForm.tsx
```

The component should accept contextual configuration.

Example concept:

```ts
<EnquiryForm
  source="PROPERTY"
  propertyId={property.id}
/>
```

or:

```ts
<EnquiryForm
  source="SERVICE"
  serviceId={service.id}
/>
```

Avoid creating completely separate forms for every page.

---

# 13. CORE FORM FIELDS

Recommended:

```text
Name *
Phone *
Email
Company
Requirement / Message *
```

Contextual fields should be displayed only when useful.

For example:

```text
Budget
Preferred Location
```

may be relevant to real-estate enquiries.

Do not make unnecessary fields mandatory.

---

# 14. FORM VALIDATION

Validation must happen on both:

```text
Client
```

and:

```text
Server
```

Client validation improves UX.

Server validation protects the application.

Validate:

- name
- phone
- email
- message
- IDs
- enum/source values
- URL values
- optional numeric values

Never trust client validation alone.

---

# 15. NAME VALIDATION

Prevent obviously invalid submissions.

Requirements:

- trim whitespace
- reasonable minimum length
- reasonable maximum length
- reject empty values

Do not over-restrict legitimate names.

---

# 16. PHONE VALIDATION

Phone numbers should:

- be trimmed
- have reasonable length validation
- support legitimate international formatting where practical
- not be stored with arbitrary client-side assumptions

Do not assume every lead is from one country unless the business explicitly requires that.

---

# 17. EMAIL VALIDATION

Email is optional unless the specific form requires it.

If provided:

- validate format
- normalize whitespace
- store safely

Do not reject legitimate uncommon but valid email formats unnecessarily.

---

# 18. MESSAGE VALIDATION

Message/requirement should:

- be trimmed
- have reasonable minimum length
- have reasonable maximum length

Protect against:

- excessively large payloads
- script injection
- malformed content

Store text as data, not executable HTML.

---

# 19. SPAM / ABUSE PROTECTION

Implement a reasonable foundation.

Possible mechanisms:

- honeypot field
- submission rate limiting
- server-side validation
- request-size limits
- duplicate-submission protection where appropriate

Do not add an external CAPTCHA service unless the project actually needs it and credentials/configuration are available.

Do not make the form unnecessarily difficult to use.

---

# 20. HONEYPOT

A hidden honeypot field may be used.

Example:

```text
website
```

Real users should leave it empty.

If populated, reject or silently ignore the submission.

Do not expose honeypot behavior visibly.

---

# 21. RATE LIMITING

Introduce a lightweight server-side rate limit if the existing infrastructure supports it.

Protect against repeated submissions from:

```text
IP / request context
```

Do not store unnecessary IP information permanently.

If rate-limiting infrastructure requires temporary request metadata, document retention behavior.

---

# 22. DUPLICATE SUBMISSIONS

Do not create multiple identical leads simply because a user double-clicked the submit button.

Frontend:

```text
Submitting...
```

must disable repeated submission.

Server-side duplicate handling may use a short time-window check where appropriate.

Do not merge distinct legitimate enquiries incorrectly.

---

# 23. DATABASE RELATIONSHIPS

Recommended:

```text
Lead
 │
 └── Enquiries
```

And contextual relationships:

```text
Enquiry
 ├── Ecosystem
 ├── Service
 ├── Project
 ├── Property
 └── Plot
```

Relationships should be nullable where the context is not applicable.

---

# 24. REFERENTIAL INTEGRITY

If an enquiry references:

```text
projectId
propertyId
plotId
serviceId
ecosystemId
```

verify that the referenced record exists.

Prefer server-side validation before persistence.

Do not allow arbitrary IDs from the browser to create invalid relationships.

---

# 25. PUBLIC WRITE BOUNDARY

The public website may create:

```text
Lead
Enquiry
Site Visit Request
```

only through controlled server-side operations.

The browser must not receive unrestricted database write access.

Correct:

```text
Form
 ↓
Server Action / API
 ↓
Validation
 ↓
Repository
 ↓
Database
```

Incorrect:

```text
Form
 ↓
Direct Database Client
```

---

# 26. SERVER ACTION / API DESIGN

Use the existing TanStack Start conventions.

Choose one consistent server-side submission approach.

Possible architecture:

```text
src/server/
    repositories/
    validation/
    actions/
    services/
```

Example conceptual function:

```ts
createEnquiry(input)
```

Responsibilities:

1. validate input
2. normalize data
3. verify relationships
4. create/find lead
5. create enquiry
6. optionally trigger configured notification
7. return safe result

Do not return database internals to the browser.

---

# 27. LEAD CREATION LOGIC

When a new enquiry arrives:

```text
Receive Enquiry
      ↓
Validate
      ↓
Find matching lead where appropriate
      ↓
Create Lead if necessary
      ↓
Create Enquiry
```

Matching logic must be conservative.

Do not merge two people merely because names are identical.

Use reliable identifiers such as verified email/phone when the business rules support it.

If identity matching is uncertain, create a new lead/enquiry rather than incorrectly merging records.

---

# 28. INITIAL LEAD STATUS

Newly created leads should default to:

```text
NEW
```

Do not automatically mark leads:

```text
INTERESTED
SITE_VISIT
BOOKED
CLOSED
```

without a real business event.

---

# 29. ENQUIRY STATUS

If useful, enquiries may have their own lightweight status:

```text
NEW
PROCESSED
CLOSED
```

Do not confuse enquiry status with lead lifecycle status.

If the current business requirement does not need enquiry status, do not add unnecessary complexity.

---

# 30. ASSIGNMENT FOUNDATION

The lead model may contain:

```text
assignedTo
```

as a nullable field.

Phase 7 may support the data field and repository operation.

Do NOT build:

- staff assignment UI
- team dashboard
- workload distribution
- automated assignment rules

Those belong to future admin/CRM work.

---

# 31. SITE VISIT MODEL

Create a dedicated site-visit request model.

Suggested fields:

```text
id
leadId
projectId
propertyId
plotId
name
phone
email
preferredDate
preferredTime
message
status
createdAt
updatedAt
```

Status can initially be:

```text
REQUESTED
CONTACTED
CONFIRMED
COMPLETED
CANCELLED
```

Keep the model simple.

---

# 32. SITE VISIT SCOPE

Phase 7 supports a **request**, not a complete booking engine.

Flow:

```text
Project Page
    ↓
Request a Site Visit
    ↓
Form
    ↓
Database
    ↓
REQUESTED
```

The JLUXE team can later follow up.

---

# 33. DO NOT BUILD APPOINTMENT SCHEDULING

Do not implement:

- live calendar availability
- staff calendars
- time-slot locking
- Google Calendar synchronization
- automated booking confirmations
- reminders
- rescheduling engine
- recurring appointments

These are future capabilities.

---

# 34. SITE VISIT VALIDATION

Validate:

- lead/contact details
- project/property/plot context
- preferred date
- preferred time
- message

Do not assume the requested date/time is available.

The request is only a preference until confirmed by JLUXE.

---

# 35. DATE HANDLING

Store dates in a consistent server/database format.

Do not interpret a requested date as confirmed availability.

Avoid timezone assumptions in the UI.

If a timezone is required, use the application's configured timezone rather than silently guessing.

---

# 36. CONTACT PAGE

The contact page should use the centralized enquiry infrastructure.

Recommended:

```text
Contact Information
↓
General Enquiry Form
↓
Success State
```

Use only verified:

- phone
- email
- WhatsApp
- address
- hours

If a setting is unavailable, omit it rather than inventing one.

---

# 37. SERVICE ENQUIRIES

Service pages should support contextual enquiries.

Example:

```text
Business Solutions
    ↓
Marketing Solutions
    ↓
Enquire
```

The enquiry should retain:

```text
ecosystemId
serviceId
source = SERVICE
```

This allows future lead reporting.

---

# 38. ECOSYSTEM ENQUIRIES

Ecosystem pages should support a general ecosystem enquiry.

Example:

```text
Interested in Business Solutions?
        ↓
Let's Talk
```

Persist:

```text
ecosystemId
source = ECOSYSTEM
```

---

# 39. PROJECT ENQUIRIES

Project pages should support:

```text
Enquire About This Project
```

Persist:

```text
projectId
source = PROJECT
```

If the user came from a project page, preserve the project context automatically.

---

# 40. PROPERTY ENQUIRIES

Property pages should support:

```text
Enquire About This Property
```

Persist:

```text
propertyId
projectId
source = PROPERTY
```

---

# 41. PLOT ENQUIRIES

Plot pages should support:

```text
Enquire About This Plot
```

Persist:

```text
plotId
projectId
source = PLOT
```

---

# 42. CAREER ENQUIRIES

Do not force career applications into the general lead pipeline unless the business explicitly requires that.

If careers later require applications, create a separate application model.

Do not implement a full recruitment application system in Phase 7.

---

# 43. SUCCESS STATE

After a successful enquiry:

```text
Thank you.

Your enquiry has been received.
Our team will get in touch with you.
```

Do not promise a specific response time unless officially defined.

Provide:

```text
Back to Website
```

and/or relevant next action.

---

# 44. ERROR STATE

If submission fails:

```text
We couldn't submit your enquiry right now.

Please try again.
```

Do not expose:

```text
SQL errors
stack traces
database connection details
internal IDs
```

---

# 45. LOADING STATE

During submission:

```text
Submitting...
```

Disable duplicate submission.

The loading state must be accessible.

---

# 46. FORM ACCESSIBILITY

Every field needs:

- visible or accessible label
- appropriate input type
- validation message
- keyboard support
- visible focus
- error association
- sufficient touch target

Do not rely solely on placeholder text as labels.

---

# 47. PRIVACY

Collect only information needed for the enquiry.

Avoid collecting:

- unnecessary demographic information
- passwords
- unrelated personal data
- sensitive information

Do not display personal lead data publicly.

---

# 48. PERSONAL DATA STORAGE

Lead data is business/customer information.

Implement sensible safeguards:

- server-only access
- validation
- restricted queries
- safe logging
- no client-side database credentials

Do not expose all leads through public APIs.

---

# 49. NOTIFICATION FOUNDATION

If the existing project already has a verified email/notification integration, Phase 7 may add a controlled notification after successful enquiry creation.

Potential notification:

```text
New JLUXE Enquiry
```

Include only necessary information.

Do not hard-code email addresses.

Use site settings/environment configuration.

---

# 50. EMAIL FAILURE BEHAVIOR

If email notification fails after database persistence:

Do not report the entire enquiry as failed if the enquiry was successfully saved.

Preferred flow:

```text
Database Save
      ↓
Success
      ↓
Notification Attempt
      ↓
Notification Failure
      ↓
Log / Retry Later
```

The user should still receive a successful submission response if their enquiry was persisted successfully.

Do not build a complete notification retry queue in Phase 7.

---

# 51. WHATSAPP CTA

If a verified JLUXE WhatsApp number exists, contextual links may be generated.

Example:

```text
Hello JLUXE, I am interested in [Project Name].
```

For property:

```text
Hello JLUXE, I am interested in [Property Name].
```

For service:

```text
Hello JLUXE, I am interested in [Service Name].
```

Do not hard-code an unverified number.

---

# 52. UTM / CAMPAIGN TRACKING

Where practical, capture:

```text
utm_source
utm_medium
utm_campaign
```

when the visitor arrives through a campaign URL.

Do not collect arbitrary browser data without a clear business purpose.

Persist campaign metadata with the enquiry when available.

---

# 53. PAGE URL

Capture the originating page URL where appropriate.

Examples:

```text
/real-estate/projects/example-project
/services/marketing-solutions
/contact
```

This is useful for contextual source reporting.

Do not trust the URL as a security boundary.

---

# 54. SOURCE ATTRIBUTION

Use a controlled source enum.

Example:

```ts
type EnquirySource =
  | "CONTACT"
  | "ECOSYSTEM"
  | "SERVICE"
  | "PROJECT"
  | "PROPERTY"
  | "PLOT"
  | "CAREER"
  | "OTHER";
```

Do not allow arbitrary client-provided source strings.

---

# 55. REPOSITORY LAYER

Add domain repositories consistent with Phase 6.

Possible:

```text
src/server/repositories/
    leads.ts
    enquiries.ts
    siteVisits.ts
```

Example operations:

```ts
createLead()
findLead()
updateLeadStatus()
createEnquiry()
getEnquiryById()
createSiteVisitRequest()
getSiteVisitRequest()
```

Only expose operations needed by current workflows.

---

# 56. VALIDATION LAYER

Possible structure:

```text
src/server/validation/
    lead.ts
    enquiry.ts
    siteVisit.ts
```

Validation schemas should be reusable between:

```text
Server action
API handler
Future admin interface
```

Do not duplicate validation rules in multiple places.

---

# 57. TRANSACTION SAFETY

Creating:

```text
Lead
+
Enquiry
```

should be treated as one logical operation.

If the database supports transactions, use a transaction where appropriate.

Desired behavior:

```text
Lead creation succeeds
+
Enquiry creation succeeds
=
Success
```

If the transaction fails:

```text
No partial enquiry state
```

unless the architecture intentionally requires another approach.

---

# 58. CONCURRENCY

Avoid duplicate lead creation caused by simultaneous submissions where possible.

Use:

- unique constraints where appropriate
- transactions
- conservative matching

Do not rely only on frontend disabling.

---

# 59. ERROR LOGGING

Server logs may record:

```text
validation failure
database failure
notification failure
unexpected application error
```

Do not log:

- passwords
- secrets
- full payment information
- unnecessary personal data

Keep logs useful and privacy-conscious.

---

# 60. API RESPONSE SHAPE

Return safe, predictable responses.

Example:

```ts
{
  success: true,
  message: "Your enquiry has been received."
}
```

Error:

```ts
{
  success: false,
  message: "Unable to submit your enquiry."
}
```

Do not return:

```text
database records
internal stack traces
SQL
server configuration
```

unless explicitly required for a trusted internal operation.

---

# 61. SECURITY

Implement appropriate foundations against:

- SQL injection / unsafe queries
- XSS
- malformed input
- oversized requests
- spam
- unauthorized data access
- information leakage

Use the database/ORM safely.

Escape/render user-generated text appropriately.

Do not render submitted message content as raw HTML.

---

# 62. PUBLIC DATA BOUNDARY

Public users can:

```text
CREATE enquiry
CREATE site visit request
```

Public users must NOT be able to:

```text
READ all leads
READ all enquiries
UPDATE lead status
DELETE leads
ASSIGN leads
VIEW internal notes
```

Those are future admin capabilities.

---

# 63. ADMIN BOUNDARY

The database may contain fields required by future admin functionality:

```text
assignedTo
status
internal notes if later approved
```

But Phase 7 must not expose these through public UI.

---

# 64. REAL-ESTATE DATA RELATIONSHIP VALIDATION

For a property enquiry:

```text
propertyId
```

must reference an existing property.

If the property belongs to a project:

```text
projectId
```

should remain consistent.

Do not allow:

```text
Property A
Project B
```

as an invalid contextual combination.

---

# 65. SERVICE DATA RELATIONSHIP VALIDATION

For service enquiry:

```text
serviceId
```

must reference a valid service.

If the service belongs to an ecosystem:

```text
ecosystemId
```

must match the service relationship.

---

# 66. SITE VISIT CONTEXT

Site visits are primarily relevant to real estate.

Do not expose a site-visit CTA on unrelated:

```text
Business Solutions
Talent & Training
```

pages unless there is an explicit business requirement.

---

# 67. MOBILE EXPERIENCE

Forms must work well on mobile.

Verify:

- full-width inputs
- readable labels
- comfortable spacing
- keyboard behavior
- submit button touch target
- validation messages
- no horizontal overflow

Do not use overly complex multi-column forms on small screens.

---

# 68. RESPONSIVE EXPERIENCE

Test:

```text
Mobile
Tablet
Desktop
Wide Desktop
```

Verify all contextual forms.

---

# 69. DESIGN SYSTEM

Use the established JLUXE design language:

- warm ivory
- forest green
- brass accents
- dark ink
- editorial serif headings
- clean sans-serif body
- restrained borders
- minimal radius
- premium understated styling

Do not introduce generic SaaS-form styling.

---

# 70. FORM COMPONENTS

Create reusable primitives where appropriate:

```text
EnquiryForm
FormField
FormError
FormSuccess
FormSubmitButton
SiteVisitForm
ContextSummary
```

Reuse existing form components if already available.

Do not duplicate form logic across pages.

---

# 71. CONTEXT SUMMARY

Contextual forms may display:

```text
You are enquiring about:

Project Name
Location
```

or:

```text
You are enquiring about:

Property Name
Project Name
```

This helps users verify what they are submitting.

Do not allow context display to become editable unless necessary.

---

# 72. FORM RESET

After successful submission:

- clear sensitive form state
- show success state
- avoid accidental duplicate submission

If navigation occurs, preserve a clear success confirmation where practical.

---

# 73. ANALYTICS BOUNDARY

Do not add a complete analytics platform in Phase 7.

If an existing analytics system is already present, enquiry submission events may be integrated carefully.

Do not collect unnecessary personal information in analytics events.

---

# 74. DATABASE INDEXING

Consider indexes on:

```text
Lead.phone
Lead.email
Lead.status
Lead.createdAt

Enquiry.leadId
Enquiry.source
Enquiry.createdAt

SiteVisit.leadId
SiteVisit.projectId
SiteVisit.status
```

Use actual query patterns to determine final indexes.

Do not blindly index every field.

---

# 75. RETENTION

Do not invent a customer-data retention period.

If no official retention policy exists, document that retention policy remains a business/legal decision.

Do not automatically delete leads after an arbitrary number of days.

---

# 76. TESTING

Test:

### Lead

- [ ] create lead
- [ ] find existing lead safely
- [ ] default status = NEW
- [ ] status validation

### Enquiry

- [ ] create enquiry
- [ ] contextual relationship validation
- [ ] source validation
- [ ] message validation

### Site Visit

- [ ] create request
- [ ] date validation
- [ ] project/property/plot relationship
- [ ] default status = REQUESTED

### Security

- [ ] invalid input rejected
- [ ] oversized input rejected
- [ ] direct database access impossible from browser
- [ ] secrets not exposed

### UX

- [ ] loading state
- [ ] success state
- [ ] error state
- [ ] duplicate-submit prevention
- [ ] mobile form behavior

---

# 77. PHASE 7 ROUTE INTEGRATION

Verify contextual CTAs on:

```text
/contact

/ecosystems/$slug

/services/$slug

/real-estate/projects/$slug

/real-estate/properties/$slug

/real-estate/plots/$slug
```

Do not create duplicate enquiry pages unnecessarily.

---

# 78. EXISTING ROUTE REGRESSION

After implementation verify:

```text
/
 /ecosystems
 /ecosystems/$slug
 /services
 /services/$slug
 /real-estate
 /real-estate/projects
 /real-estate/projects/$slug
 /real-estate/properties
 /real-estate/properties/$slug
 /real-estate/plots
 /real-estate/plots/$slug
 /contact
```

Use the actual repository routes if their names differ.

---

# 79. SUCCESSFUL END-TO-END FLOW

At minimum this should work:

```text
Open Project
      ↓
Click "Enquire About This Project"
      ↓
Form opens
      ↓
Enter details
      ↓
Submit
      ↓
Client validation
      ↓
Server validation
      ↓
Relationship validation
      ↓
Lead creation/find
      ↓
Enquiry creation
      ↓
Optional notification
      ↓
Success response
```

Equivalent flows should work for:

```text
Service
Property
Plot
General Contact
```

---

# 80. SITE VISIT END-TO-END FLOW

```text
Project
   ↓
Request a Site Visit
   ↓
Enter contact details
   ↓
Preferred date/time
   ↓
Submit
   ↓
Validate
   ↓
Create/find Lead
   ↓
Create Site Visit Request
   ↓
REQUESTED
   ↓
Success
```

No calendar availability is involved.

---

# 81. ACCEPTANCE CHECKLIST

Phase 7 is complete when:

## Lead System

- [ ] Lead model exists.
- [ ] Lead status exists.
- [ ] New leads default to NEW.
- [ ] Lead matching is conservative.
- [ ] No public lead listing exists.

## Enquiries

- [ ] General contact enquiry works.
- [ ] Ecosystem enquiry works.
- [ ] Service enquiry works.
- [ ] Project enquiry works.
- [ ] Property enquiry works.
- [ ] Plot enquiry works.
- [ ] Source tracking works.
- [ ] Context relationships are validated.

## Site Visits

- [ ] Site visit request model exists.
- [ ] Project site-visit request works.
- [ ] Property/plot context can be supported where appropriate.
- [ ] Status defaults to REQUESTED.
- [ ] No calendar scheduling system was introduced.

## Security

- [ ] Server-side validation.
- [ ] Safe database writes.
- [ ] No public database access.
- [ ] No secrets exposed.
- [ ] Basic spam protection.
- [ ] Safe error handling.

## UX

- [ ] Loading state.
- [ ] Success state.
- [ ] Error state.
- [ ] Duplicate submission protection.
- [ ] Accessible labels.
- [ ] Mobile-friendly forms.
- [ ] Existing JLUXE styling preserved.

## Notifications

- [ ] Notification only uses verified configuration.
- [ ] Notification failure does not incorrectly mark persisted enquiry as failed.

## Regression

- [ ] Homepage works.
- [ ] Ecosystem pages work.
- [ ] Service pages work.
- [ ] Real-estate pages work.
- [ ] Project pages work.
- [ ] Property pages work.
- [ ] Plot pages work.
- [ ] Contact page works.

---

# 82. DO NOT IMPLEMENT PHASE 8 EARLY

Do not add advanced editorial functionality beyond what is needed to support existing enquiry flows.

Do not build a full content/editorial workflow for:

- testimonials
- insights
- articles

Those belong to Phase 8.

---

# 83. DO NOT IMPLEMENT PHASE 9 EARLY

Do NOT build:

- Admin Dashboard
- CRM dashboard
- lead table UI
- Kanban pipeline
- lead assignment interface
- internal lead notes UI
- admin authentication
- staff management
- content management UI
- admin analytics
- admin reporting dashboard

Phase 9 will consume the Phase 7 data foundation.

---

# 84. DO NOT IMPLEMENT PHASE 10 EARLY

Do not perform the complete final security/performance/accessibility audit.

Implement only the security required to safely operate enquiry submission.

The comprehensive final pass belongs to Phase 10.

---

# 85. FINAL AGENT INSTRUCTION

Implement **ONLY Phase 7 — Leads, Enquiries & Site Visits**.

Before editing:

1. inspect the existing repository
2. inspect Phase 6 database architecture
3. inspect existing form components
4. inspect existing contact route
5. inspect real-estate/service contextual CTAs
6. reuse existing validation/database conventions
7. create the required models/migrations
8. create repository/data-access operations
9. create secure server-side submission flows
10. integrate contextual forms
11. preserve existing UI and routes

Do not:

- introduce JLUXE Boutique
- invent company contact information
- fabricate leads
- fabricate customer data
- build a CRM dashboard
- build admin UI
- build calendar scheduling
- build payments
- build a complete analytics platform
- rebuild completed phases

After implementation:

1. run database migrations
2. run seed/migration checks
3. run type checks
4. run production build
5. test general contact enquiry
6. test service enquiry
7. test project enquiry
8. test property enquiry
9. test plot enquiry
10. test site-visit request
11. test invalid submissions
12. test duplicate submission protection
13. verify no secrets are exposed
14. verify existing routes
15. check mobile and desktop behavior
16. summarize all changes
17. list any assumptions
18. list any demo/test data separately
19. explicitly confirm that Phase 8/9/10 functionality was not implemented

---

# 86. PHASE 7 END STATE

The desired architecture is:

```text
                    JLUXE WEBSITE
                          │
          ┌───────────────┴────────────────┐
          │                                │
      PUBLIC USER                       FUTURE ADMIN
          │                                │
          ▼                                ▼
     Enquiry Forms                    Future CRM UI
          │                                │
          ▼                                ▼
       Server Layer                    Admin Layer
          │                                │
          └───────────────┬────────────────┘
                          ▼
                   Repository Layer
                          │
                          ▼
                      Database
                          │
          ┌───────────────┼───────────────┐
          │               │               │
        Leads         Enquiries       Site Visits
          │               │               │
          └───────────────┴───────────────┘
                          │
                          ▼
                    Future Phase 9
                    Admin / CRM
```

The important architectural separation is:

```text
PUBLIC WEBSITE
     ↓
CONTROLLED SERVER OPERATIONS
     ↓
LEADS / ENQUIRIES / SITE VISITS
     ↓
DATABASE
     ↓
FUTURE ADMIN / CRM
```

Phase 7 is therefore the **conversion and customer-interaction foundation**, not the CRM itself.

**Phase 7 goal:**

> Build a secure, reusable and contextual customer enquiry system that can capture interactions from JLUXE's ecosystems, services and real-estate inventory, persist them as leads/enquiries/site-visit requests, and provide a clean foundation for the future Admin/CRM phase.
