---
date: 2026-11-02
topic: ERP process discovery and feature rationalization
status: preliminary
sources-reviewed: Microsoft Learn, SAP Help Portal, OpenAI Developers
---

# ERP process discovery and feature rationalization

## Purpose and boundary

This is a preliminary research note for reviewing MNI's ERP reference and related Google Sheets. It does not yet describe Antlia's actual modules or MNI's spreadsheet data. The Antlia page could not be inspected in this session because browser access is disabled in Work settings and the public page is not accessible through the web reader. Google Drive and Google Sheets connections are awaiting OAuth completion.

## Research findings

### Start with end-to-end processes

Use process areas and outcomes as the unit of analysis, rather than starting from the ERP's menu labels. For manufacturing and operations, likely process chains to validate include:

- Plan and source: demand or job → material planning → purchase request/order → supplier receipt.
- Inventory and warehouse: receiving → put-away → storage → issue/transfer → cycle count → reconciliation.
- Make and fulfill: customer order/SPK → production planning → work-center execution → quality → finished goods → delivery.
- Finance/control: source transaction → valuation/costing → approval → ledger/reporting.

The process chains above are a discovery checklist, not a claim that every chain is used at MNI. Microsoft's process-focused guidance recommends mapping business processes and scope before configuring an implementation, then iterating through end-to-end flows and their subprocesses. [Process-focused implementation](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/process-focused-solution), [Inventory to deliver](https://learn.microsoft.com/en-us/dynamics365/guidance/business-processes/inventory-to-deliver-introduction).

### Compare current practice with standard capability before tailoring

Run fit-to-standard workshops using process scenarios: demonstrate a standard flow, let process owners validate it against real work, record gaps, and only then consider adaptations or extensions. Microsoft advises adopting standard capabilities where they fit and adapting only when justified; SAP's fit-to-standard guidance similarly uses prebuilt process models, captures gaps, and records decisions against the process. [Microsoft fit-to-standard and fit-gap](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/process-focused-solution-fit-to-standard-fit-gap-analysis), [SAP fit-to-standard workshops](https://help.sap.com/docs/erp-transformation-with-itc/btm/fit-to-standard-workshops?locale=en-US&state=PRODUCTION&version=latest).

### Decide feature scope with evidence and dependency checks

Do not label a feature “unneeded” solely because few rows appear in a spreadsheet or users rarely open its screen. For each feature/module, collect:

1. Business owner and process outcome supported.
2. Recent usage and transaction evidence, with time window and source completeness.
3. Dependencies on other modules, reports, interfaces, permissions, or statutory/control steps.
4. Pain points, duplicate work, data quality, and workarounds.
5. Options: retain as standard, configure, improve process, integrate, extend, replace, defer, or retire.
6. Impact, risk, implementation effort, test needs, and owner approval.

Microsoft fit-gap guidance specifically asks teams to assess customization lifecycle cost, usability/performance effects, future product redundancy, and effects on connected processes. A removal decision therefore needs dependency mapping and process-owner sign-off, not just a low-use metric. [Fit-gap guidance](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/process-focused-solution-fit-to-standard-fit-gap-analysis).

### Treat ERP spreadsheets as evidence, not a system specification

Inventory all accessible sheets first: owner/name, URL/ID, modified date, tabs, used ranges, formulas, validation, duplicate structures, and links between files. Then classify each sheet as master data, transaction register, planning model, report, control/reconciliation, or archive. Sample and profile data before interpreting it. Preserve row-level source references and distinguish:

- **Observed:** directly present in a sheet or ERP screen.
- **Interpreted:** likely meaning inferred from structure or naming.
- **Proposed:** future process or design recommendation.

Microsoft's data guidance separates configuration data from migration data, requires discovery of source, type and volume, mapping and transformation, quality validation, and repeated migration tests. That is a useful discipline when deciding what must be retained or cleaned up. [Data management and migration](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/data-management-configuration-data-migration), [Data governance checklist](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/data-management-check-list).

### Validate with process owners and realistic scenarios

Turn each accepted requirement into a traceable scenario and test case. Include normal, exception, permissions, integration, reporting, and data cases in proportion to risk. Microsoft's guidance recommends end-to-end business-process tests and connecting test cases to the process and requirement they validate. [Test planning](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/testing-strategy-planning), [Testing strategy](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/testing-strategy).

## Proposed analysis outputs

- ERP module and process map with owners and source evidence.
- Google Sheets inventory and data dictionary, with links and bounded cell ranges.
- Current-state process maps and observed variants.
- Fit-gap register with rationale and alternatives.
- Feature disposition matrix: retain, configure, improve, integrate, extend, defer, or retire.
- Dependency and risk register.
- Prioritized roadmap and scenario-based acceptance checklist.

## Current uncertainties

- Antlia login and actual module/menu details have not been inspected.
- No Google Drive/Sheets account is active in Composio yet; spreadsheet contents have not been read.
- A low-use feature may still be required for compliance, month-end, audit, or downstream processing.
- The final scope depends on MNI process-owner input and evidence from real workflows, not vendor documentation alone.

## Sources

- Microsoft, [What is the Dynamics 365 implementation guide?](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/overview), accessed 2026-11-02.
- Microsoft, [Implement a solution based on business processes](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/process-focused-solution), accessed 2026-11-02.
- Microsoft, [Fit-to-standard and fit-gap analysis](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/process-focused-solution-fit-to-standard-fit-gap-analysis), accessed 2026-11-02.
- Microsoft, [Manage configuration and migration data](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/data-management-configuration-data-migration), accessed 2026-11-02.
- Microsoft, [Testing strategy planning](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/testing-strategy-planning), accessed 2026-11-02.
- SAP, [Fit-to-standard workshops](https://help.sap.com/docs/erp-transformation-with-itc/btm/fit-to-standard-workshops?locale=en-US&state=PRODUCTION&version=latest), accessed 2026-11-02.
- OpenAI, [Codex skills and workflow guidance](https://developers.openai.com/plugins/concepts/skills), accessed 2026-11-02.
