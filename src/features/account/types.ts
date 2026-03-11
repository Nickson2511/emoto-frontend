import type { User } from "../users/types";
import type { Address } from "../../services/addressAPI";
import type { Order } from "../../services/orderAPI";

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