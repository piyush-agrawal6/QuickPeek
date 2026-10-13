# Decision
Lifetime Pro non-consumable; feature policy remains provisional.

## Context
The brief proposes $9.99 launch and $14.99 later without subscriptions or accounts.

## Options
Useful free inspection plus lifetime unlock; subscription (out of scope); fully paid app.

## Decision
Use StoreKit 2 non-consumable. Proposed Free: JSON, YAML, Markdown, raw and basic metadata. Proposed Pro: CSV/TSV, SQLite, TOML, XML, ENV, JSONL, advanced logs/search and large-file modes. Centralize policy and provide usable samples/limited previews.

## Consequences
Verified transactions, restore, offline handling, refunds/revocations and safe extension entitlement sharing need tests. Show localized prices from StoreKit; never rely on a Boolean preference as purchase proof.
