import { Nullable } from '../utils/TypeUtils';

export interface Viewer {
    id: Nullable<string>;
    token: Nullable<string>;
    avatar: Nullable<string>;
    hasWallet: Nullable<boolean>;
    didRequest: boolean;
}
