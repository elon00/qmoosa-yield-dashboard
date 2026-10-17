export interface VaultOverview {
  vaultAddress: string;
  asset: string;
  tvlUsd: bigint;
  sharePrice: number;
  netApyBps: number;
  grossApyBps: number;
}

export interface YieldDashboardState {
  connectedWallet: string | null;
  chainId: number;
  userDepositUsd: bigint;
  userShares: bigint;
  vaults: VaultOverview[];
}

export class YieldDashboardStore {
  private state: YieldDashboardState;

  constructor() {
    this.state = {
      connectedWallet: null,
      chainId: 31337,
      userDepositUsd: 0n,
      userShares: 0n,
      vaults: [
        {
          vaultAddress: "0x8888888888888888888888888888888888888888",
          asset: "USDC",
          tvlUsd: 50_000_000n,
          sharePrice: 1.0825,
          netApyBps: 920,   // 9.20% net
          grossApyBps: 1020 // 10.20% gross
        },
        {
          vaultAddress: "0x9999999999999999999999999999999999999999",
          asset: "WETH",
          tvlUsd: 85_000_000n,
          sharePrice: 1.124,
          netApyBps: 540,   // 5.40% net
          grossApyBps: 600  // 6.00% gross
        }
      ]
    };
  }

  public getState(): YieldDashboardState {
    return { ...this.state };
  }

  public connectWallet(address: string): void {
    if (!address || address.length < 10) {
      throw new Error("Invalid wallet address");
    }
    this.state.connectedWallet = address;
  }

  public disconnectWallet(): void {
    this.state.connectedWallet = null;
    this.state.userDepositUsd = 0n;
    this.state.userShares = 0n;
  }

  public updateUserPosition(depositUsd: bigint, shares: bigint): void {
    this.state.userDepositUsd = depositUsd;
    this.state.userShares = shares;
  }
}
