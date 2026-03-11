import type { User } from "../users/types";
import type { Address } from "../../types/address";
import type { Order } from "../../types/order";

export interface AccountStats {
    totalOrders: number;
    wishlistItems: number;
    cartItems: number;
    addresses: number;
}

export interface AccountState {
    user: User | null;
    stats: AccountStats | null;
    defaultAddress: Address | null;
    recentOrders: Order[];
    loading: boolean;
}