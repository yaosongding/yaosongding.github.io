---
title: "Life Cycle of Agno's AgentOS"
description: "A technical deep-dive into AgentOS initialization and its two-phase startup process."
pubDate: 2026-06-21
---

# Life Cycle of Agno's AgentOS

## Part 1: Initialization

The entry function of the whole AgentOS lies in `libs/agno/agno/os/app.py`, and it's easy to know how to use this library class in official examples like [this](https://docs.agno.com/agent-os/run-your-os). The core class here is `AgentOS`, whose goal is to build a FastAPI server ready to run, with the whole agent system wrapped behind APIs — all functions will be served through different routes. It uses a 2-phase initialization.

- **Phase One:** Load params and configs → Discover knowledge bases → Initialize agents (inject DB, track MCP, propagate flags) → Initialize teams/workflows → Populate registry → Detect duplicates → Setup tracing → return a self-consistent agent object model.

- **Phase Two:** Compose FastAPI lifespans for everything → register routes for FastAPI server → apply exception and auth handlers → return the FastAPI object (ready to run).

*To be continued...*
