# Brain Dump - Organized Structure

## Section 1: The Scarcity Context (Why This Matters Now)

### Infrastructure Reality
- GPU/memory shortages extending to 2028
- Microsoft choosing between Copilot (internal) vs Azure (enterprise customers)
- Hyperscalers spending hundreds of billions on GPU contracts/capex
- Scarcity is structural, not temporary

### Demand Explosion
- Companies moving past "pilot purgatory"
- "Real" agents coming online: Claude Code, Codex, GitHub Copilot
- Inference demand skyrocketing

---

## Section 2: Model Selection Confusion (The Education Gap)

### Migration Path Confusion
- Natural replacement for GPT-4o is GPT-4.1, NOT GPT-5
- GPT-5-mini is a reasoning model, not a 1:1 swap for GPT-4.1-mini
- Setting `reasoning=none` not available on GPT-5-mini (verify this)
- GPT-5.1 (where you CAN set reasoning=none) has no mini variant
- **No true replacement for GPT-4.1-mini exists** → retirement date likely pushed back

### "Chat" Variant Misconceptions
- GPT-5-chat etc. are experimental/preview, no GA target
- OpenAI hasn't committed to this long-term
- Customers wrongly think "chat app = need chat model"
- Enterprise reality: reliability/accuracy/logic > natural conversation flow

### The Reasoning Parameter
- Customers don't understand what it does
- Fundamentally changes compute profile
- Tokens count as output (8x weight on PTU)

### Hidden Gems (Underutilized Options)
- **Codex models**: More available, excellent for non-code tasks (docs, data analytics)
- **Foundry non-OpenAI models**: Mistral, Llama, etc. - 99% of customers ignore these
  - TODO: Verify PTU/Data Zone support for these
- **Claude in Foundry**: Currently not viable - compliance/deployment issues for enterprise

### The Golden Rules
1. Model choice is rarely root cause of failure (it's retrieval, chunking, system design)
2. Never seen a use-case fail because they chose GPT-5 over GPT-5.2
3. Prove the use-case with the best model first, THEN optimize for cost/latency
4. Evals are the ideal solution, but most customers don't have them → rule of thumb guidance

---

## Section 3: PTU & Capacity Planning (The Broken Math)

### The Documentation Problem
- Docs say "1 PTU = X TPM" (e.g., GPT-5-mini: 1 PTU = 23,500 TPM)
- This is misleading/incomplete

### The Real Formula
```
Effective TPM = Input Tokens + (Output Tokens + Reasoning Tokens) × 8
```
- Output tokens have 8x weight
- Reasoning tokens count as output tokens
- Calculator factors this in, but docs/metrics don't make it clear

### Common Customer Pain
- Azure Monitor shows under TPM limit
- PTU utilization at 100%, getting errors
- They're doing: `Input + Output` instead of `Input + Output×8`

### What You Actually Need to Estimate
1. Requests per minute (RPM)
2. Input tokens per request
3. Output tokens + reasoning tokens per request

### The RPM Trap
- Docs/calculator ONLY talk about TPM
- RPM quotas exist and scale with PTU
- Cannot be scaled separately
- Customers think they can blast 1000 API calls at once

### Agent Estimation Challenge
- Can't plan agent capacity on spreadsheet (loops/reflection)
- Must run evals to estimate token usage
- Spillover into PayGO is a feature, not a bug (estimates are imperfect)

---

## Section 4: Architecture Optimization (Getting More for Less)

### Prompt Caching (#1 Lever)
- First N tokens static = cache hits
- Reduces: cost (PayGO), utilization (PTU), latency (both)
- Real example: 40% PTU reduction from revising system prompt + input context

### Batch Mode (Underutilized)
- Push back on "I need it ASAP" requirements
- Many use-cases don't actually have strict SLAs
- Batch mode saves significant capacity

### High Parallelism Patterns
- Queue + Load Balancer/Router pattern
- APIM and possibly ASB
- Not just raw API calls

### Priority Processing (Preview)
- New feature bringing PTU SLAs to consumption/PayGO model
- Customers should watch this

### Mindset Shift
- LLM/agentic systems = app-dev activity, not AI activity
- Customers over-focus on model selection + RAG
- Under-focus on system architecture, scalability, design

---

## Section 5: Strategic Deployment & Planning

### Regional vs Data Zone
- Regional availability is declining
- Industry moving away from regional
- Data Zone solves availability + maintains compliance
- IT teams often have "must be regional" policy → they get stuck
- Leaders often unaware of this tradeoff

### The Copilot Mindset
- "Model must be in all regions before deploy" = friction
- Deloitte approach: prioritize speed over consistency
- Frontier companies should do the same

### Forecasting Requirements
- Capacity needs must be communicated 1 month in advance
- "100 PTUs tomorrow" doesn't work anymore
- Bonus: drives CRM hygiene, customer roadmap visibility, ACR estimates

---

## Open Items / To Verify
- [ ] Confirm GPT-5-mini cannot set reasoning=none
- [ ] Confirm GPT-5.1 has no mini variant
- [ ] Check if non-OpenAI Foundry models support PTU/Data Zone
- [ ] Claude in Foundry - specific compliance/deployment blockers
- [ ] Priority Processing current status and timeline
