# Navigating Capacity Challenges & Model Selection

## Goal
Educate colleagues on advising customers regarding Azure OpenAI model selection and capacity planning in a resource-constrained environment.

---

## Section 1: Background & Context

**Goal:** Set the stage regarding the current infrastructure reality.

### Slide 1: The Capacity Reality (2025–2028)

- **The Constraint:** Inference capacity is severely constrained due to GPU, memory, and energy shortages that are projected to extend into 2028.

- **The Allocation Challenge:** Microsoft already having to prioritize between internal products and enterprise customers.

- **The Demand Shock:** Inference demand exploding as organizations move past pilot purgatory and real agents come online.

---

## Section 2: Models (Selection, Evals, & Foundry)

**Goal:** Address customer confusion and provide the "insider" tips for success.

### Slide 2: The Customer Struggle (Common Confusion Points)

- **Migration Confusion:** Customers are lost on how to move to the GPT-5 series.
  - *Reality:* The natural replacement for GPT-4o is GPT-4.1, not necessarily GPT-5.

- **The "Mini" Gap:** Customers assume GPT-5-mini is a 1:1 swap for GPT-4.1-mini.
  - *Reality:* It is a Reasoning Model. There is currently no direct replacement for the old Mini class.

- **"Chat" Variant Misconceptions:** Customers think "Chat App = Chat Model."
  - *Reality:* "Chat" variants are experimental/preview. Enterprise apps need the reliability/logic of the main fleet.

- **The Reasoning Parameter:** Customers do not understand how it works or that it fundamentally changes the compute profile.

### Slide 3: Model Selection "Tips & Tricks" (The Playbook)

- **The "Hidden" Menu:**
  - *Codex:* Highly available and excellent for non-code tasks (Docs, Data Analytics).
  - *Foundry:* A massive opportunity to push non-OpenAI models (Mistral, Llama) if capacity/compliance aligns.

- **The Golden Rule:** Model choice is rarely the root cause of failure (it's usually retrieval/arch).

- **Tactic:** Prove the use case with the best model first, then distill/downgrade for cost.

- **Evals vs. Reality:** Evals are the only true way to select models, but since customers rarely have them, "Rule of Thumb" guidance is the necessary fallback.

---

## Section 3: Capacity Optimization & Architecture

**Goal:** Teach the "Physics" of PTU and the "Architecture" of Scarcity.

### Slide 4: The Broken Math (PTU & Rate Limits)

- **The Problem:** Docs/Calculators are misleading (e.g., "1 PTU = 23k TPM").

- **The Real Formula:**
  ```
  Input + (Output + Reasoning) × 8
  ```

- **Crucial Detail:** Output tokens have an 8x weight. Reasoning tokens count as Output.

- **The RPM Trap:** Customers ignore Rate Limits. RPM quotas scale with PTU and cannot be scaled separately.

### Slide 5: Agent Estimation & Planning

- **The Uncertainty:** You cannot plan agent capacity on a spreadsheet due to loops/reflection.

- **The Fix:** You must run evals to estimate token usage.

- **The Buffer:** Estimates are imperfect; spillover into PayGO is a critical feature for reliability, not a bug.

### Slide 6: Architecture Optimization (Getting More for Less)

- **Prompt Caching:** The #1 lever for efficiency.
  - *Stat:* First N tokens static = massive PTU/Latency reduction (e.g., 40% drops seen).

- **Batch Mode:** Push back on "ASAP" requirements. Use Batch for non-urgent tasks to save capacity.

- **Async Patterns:** High parallelism requires Queues + Load Balancers (APIM/ASB), not just API calls.

### Slide 7: Strategic Deployment

- **Regional vs. Data Zone:**
  - *Trend:* Regional availability is declining.
  - *Strategy:* Push Data Zone to solve availability while maintaining compliance.

- **Speed vs. Consistency:** Adopt the "Copilot Mindset"—prioritize innovation speed over having the model in every region.

- **The New Standard:** Capacity needs must be forecasted 1 month in advance (drives CRM hygiene).

---

## Appendix: Additional Context from Brain Dump

### Industry Context (Slide 1 expansion)
- All hyperscalers spending hundreds of billions on GPU contracts/capex—scarcity is structural, not temporary
- Real agent examples driving demand: Claude Code, Codex, GitHub Copilot

### Model Details (Slide 2 expansion)
- GPT-5-mini: Cannot set `reasoning=none` (verify this)
- GPT-5.1: Where you CAN disable reasoning, but has no mini variant
- Implication: No true replacement for GPT-4.1-mini → retirement dates likely pushed back
- "Chat" variants have no GA target date; OpenAI hasn't committed long-term
- Enterprise truth: Reliability, accuracy, logic > natural conversation flow

### Foundry Opportunities (Slide 3 expansion)
- 99% of customers are on OpenAI models when Foundry has thousands
- Claude in Foundry: Currently not viable—compliance/deployment dealbreakers for enterprise
- Need to verify: Do non-OpenAI models support PTU/Data Zone deployment?

### Model Selection Philosophy
- "I've never seen a use-case fail because they chose GPT-5 over GPT-5.2"
- Most customers don't have evals and don't prioritize building them

### PTU Debugging (Slide 4 expansion)
- Common symptom: Azure Monitor shows under TPM limit, but PTU at 100% with errors
- Root cause: Calculating `Input + Output` instead of `Input + (Output + Reasoning) × 8`
- Calculator factors this in, but docs table and metrics don't make it clear
- Formula was clarified in o-series → GPT-5 transition (previously unpublished)

### Capacity Planning Details (Slide 5 expansion)
- What you actually need to estimate:
  1. Requests per minute (RPM)
  2. Input tokens per request
  3. Output tokens + reasoning tokens per request

### Architecture Additions (Slide 6 expansion)
- **Priority Processing (Preview):** Brings PTU-level SLAs to consumption/PayGO model—watch this
- **Mindset Shift:** LLM/agentic systems = app-dev activity, not AI activity
  - Customers over-focus on model selection + RAG
  - Under-focus on system architecture, scalability, design

### Deployment Politics (Slide 7 expansion)
- IT teams often have "must be regional" policies → they get stuck
- Leaders often unaware of this tradeoff; make sure leadership knows
- Deloitte approach: prioritized speed over consistency
- Forecasting bonus: Drives CRM hygiene, customer roadmap visibility, ACR estimates

---

## Open Items / To Verify

- [ ] Confirm GPT-5-mini cannot set `reasoning=none`
- [ ] Confirm GPT-5.1 has no mini variant
- [ ] Check if non-OpenAI Foundry models support PTU/Data Zone deployment
- [ ] Claude in Foundry—specific compliance/deployment blockers
- [ ] Priority Processing current status and GA timeline
