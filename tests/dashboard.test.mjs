import { test } from "node:test";
import assert from "node:assert/strict";
import { YieldDashboardStore } from "../dist/index.js";

test("1. Default yield store state", () => {
  const store = new YieldDashboardStore();
  const state = store.getState();

  assert.equal(state.connectedWallet, null);
  assert.equal(state.vaults.length, 2);
  assert.equal(state.vaults[0].asset, "USDC");
  assert.equal(state.vaults[1].asset, "WETH");
});

test("2. Wallet connection and position tracking", () => {
  const store = new YieldDashboardStore();
  store.connectWallet("0x1234567890abcdef1234567890abcdef12345678");

  assert.equal(store.getState().connectedWallet, "0x1234567890abcdef1234567890abcdef12345678");

  store.updateUserPosition(50_000n, 46_189n);
  assert.equal(store.getState().userDepositUsd, 50_000n);
  assert.equal(store.getState().userShares, 46_189n);

  store.disconnectWallet();
  assert.equal(store.getState().connectedWallet, null);
  assert.equal(store.getState().userDepositUsd, 0n);
});
