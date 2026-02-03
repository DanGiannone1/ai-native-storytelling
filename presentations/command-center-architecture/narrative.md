# Agent Command Center - Presentation Narrative

## Overview

This presentation explains the Agent Command Center - a platform for running autonomous agent CLI jobs on local workstations, orchestrated through cloud-based scheduling, queuing, and observability.

**Audience:** Technical architecture overview
**Duration:** ~12-15 minutes
**Slides:** 9

---

## Slide-by-Slide Guide

### Slide 1: Title
**Visual:** Animated CPU icon with orbital rings, title reveal

**Hook:** "Agent Command Center - Orchestrating Autonomous Intelligence at Scale"

Sets the tone - this is about orchestrating autonomous AI agents at enterprise scale.

---

### Slide 2: The Problem
**Visual:** Placeholder (TBD)

**Key Message:** [To be determined]

This slide should establish WHY we need the Command Center. Possible angles:
- Running AI agents 24/7 is expensive in the cloud
- Need visibility into what autonomous agents are doing
- Need both scheduled and on-demand job dispatch
- Local hardware utilization

---

### Slide 3: Solution Overview
**Visual:** 6-card grid showing components by function

**Key Message:** "Here are the pieces that make up the Command Center."

Components organized by WHAT they do (not where they live):
- **Scheduler** - Triggers jobs on cron schedules
- **Queue** - Buffers and distributes jobs
- **Orchestrator** - Executes jobs on workstations
- **Telemetry** - Captures traces and metrics
- **MCP Server** - API for agents and developers
- **Dashboard** - Real-time visibility

**Talking point:** "Each component has a single responsibility. Together, they form a complete orchestration platform."

---

### Slide 4: The Big Picture
**Visual:** React Flow diagram showing end-to-end flow

**Key Message:** "Here's how data flows through the system."

Flow: `Triggers → Queue → Orchestrator → Telemetry → Dashboard`

Shows the full journey from job trigger to visibility. Two entry points (scheduled, on-demand) converge at the queue.

**Talking point:** "Whether a job is triggered by a schedule or dispatched on-demand, it follows the same execution path."

---

### Slide 5: Flow - Job Ingress
**Visual:** Two side-by-side React Flow diagrams

**Key Message:** "Two ways to add jobs, same destination."

**Scheduled Path:**
1. Document DB holds cron schedules
2. Dispatcher polls and publishes to the message bus

**On-Demand Path:**
1. Agent or developer calls MCP Server
2. MCP Server publishes to the message bus

**Talking point:** "Scheduled jobs come from the document store via the Dispatcher. On-demand jobs come through the MCP Server. Both end up in the same queue."

---

### Slide 6: Flow - Job Execution
**Visual:** React Flow diagram + 3 step cards

**Key Message:** "This is where the actual work happens."

Three phases:
1. **Pull** - Poll queue, filter by worker, ACK message
2. **Execute** - Load prompt, spawn CLI, stream output
3. **Stream** - Parse events, buffer batches, write to the analytics warehouse

**Talking point:** "The Orchestrator runs on workstations with real hardware. Cloud execution would cost a fortune for AI workloads. Local execution = powerful hardware, cost-effective operations."

---

### Slide 7: MCP Server
**Visual:** Horizontal flow showing Clients → MCP → Tools

**Key Message:** "One integration point for everything."

Shows two client types connecting:
- **Autonomous Agents** - AI agents running scheduled jobs
- **Developer Terminals** - Interactive CLI sessions

Five tools exposed:
- `telemetry` (data) - Query job metrics
- `schedules` (data) - CRUD operations
- `dispatch` (action) - Queue new jobs
- `send_email` (action) - Notifications
- `retro` (docs) - Log retrospectives

**Talking point:** "Any agent that can use MCP tools can interact with the Command Center. Same API whether you're an autonomous agent or a developer in a terminal."

---

### Slide 8: Observability
**Visual:** Dashboard mockup with stats and agent grid

**Key Message:** "Real-time visibility into everything."

Dashboard shows:
- Jobs today with trend
- Success rate
- Average execution time
- API costs
- Agent status grid (running/idle/success/error)

**Talking point:** "You can see everything happening in real-time. Which agents are running, which have errors, what's the cost trend."

---

### Slide 9: Closing
**Visual:** Convergence animation, logo, badges

**Key Message:** "Autonomous operations, unified control."

Summary badges:
- **Multi-Cloud** - Cloud A + Cloud B working together
- **Real-Time** - Streaming telemetry, instant visibility
- **Self-Healing** - Automatic retries, health monitoring

**Closing thought:** "The Command Center lets you run dozens of autonomous AI agents without babysitting them."

---

## Color Reference

| Provider | Accent Color | Usage |
|----------|-------------|-------|
| Cloud A  | `#0078d4`   | Document DB, MCP Server, Dispatcher |
| Cloud B  | `#22d3ee`   | Message Bus, Analytics Warehouse |
| Local    | `#64748b`   | Orchestrator, Dashboard |

## Tool Categories (MCP Server)

| Category | Color | Tools |
|----------|-------|-------|
| Data Access | `#22d3ee` | telemetry, schedules |
| Actions | `#34d399` | dispatch, send_email |
| Documentation | `#a78bfa` | retro |

---

## Technical Stack

- **Animation:** Framer Motion (declarative React animations)
- **Diagrams:** React Flow (@xyflow/react)
- **Styling:** Tailwind CSS
- **Build:** Vite + TypeScript

---

## Presenter Notes

1. **Start with context:** Before diving into slides, establish what the audience should get from this - a high-level understanding of how we orchestrate AI agents.

2. **Reference the flows:** The Big Picture slide is the anchor. Reference back to it when discussing specific flows.

3. **Emphasize the MCP Server:** This is the key integration point. Both autonomous agents AND developers use the same API.

4. **End with the value:** "This platform runs our code review, documentation, and testing agents 24/7."
