export {};

declare global {
  interface Window {
    __MANUS_CONFIG__?: {
      projectId: string;
      oauthPortalUrl: string;
      apiUrl: string;
      apiBrowserKey: string;
    };
  }

  namespace React {
    type ReactNode = any;
    type ComponentType<P = {}> = (props: P) => any;
    type FC<P = {}> = (props: P) => any;
  }

  namespace JSX {
    interface Element {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module "react" {
  export function useState<T>(initialState: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  export function useRef<T>(initialValue: T): { current: T };
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: readonly any[]): T;
  export function useMemo<T>(factory: () => T, deps: readonly any[]): T;
  export function createContext<T>(defaultValue: T): any;
  export function useContext<T>(context: any): T;
  export type ReactNode = any;
  export type ComponentProps<T> = any;
  export type HTMLAttributes<T> = any;
  export type ButtonHTMLAttributes<T> = any;
  export type InputHTMLAttributes<T> = any;
  export type TextareaHTMLAttributes<T> = any;
  export type FormEvent<T = any> = any;
  export type MouseEvent<T = any> = any;
  export type KeyboardEvent<T = any> = any;
  export type ChangeEvent<T = any> = any;
  export type CSSProperties = Record<string, any>;
  const ReactDefault: any;
  export default ReactDefault;
}

declare module "lucide-react" {
  export type LucideProps = {
    size?: number | string;
    strokeWidth?: number | string;
    className?: string;
    [key: string]: any;
  };
  export type LucideIcon = (props: LucideProps) => any;
  export const ArrowDownRight: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const Award: LucideIcon;
  export const BookOpen: LucideIcon;
  export const BriefcaseBusiness: LucideIcon;
  export const Building2: LucideIcon;
  export const Check: LucideIcon;
  export const GraduationCap: LucideIcon;
  export const HeartPulse: LucideIcon;
  export const Laptop: LucideIcon;
  export const MapPin: LucideIcon;
  export const Menu: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const Sparkles: LucideIcon;
  export const X: LucideIcon;
  export const Zap: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const Home: LucideIcon;
  export const Loader2: LucideIcon;
  export const Send: LucideIcon;
  export const User: LucideIcon;
  export const Bot: LucideIcon;
  export const PanelLeft: LucideIcon;
  export const LogOut: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const MoreHorizontal: LucideIcon;
  export const Search: LucideIcon;
  export const Circle: LucideIcon;
  export const Phone: LucideIcon;
  export const Mail: LucideIcon;
}

declare module "wouter" {
  export const Route: any;
  export const Switch: any;
  export const Link: any;
  export function useLocation(): [string, (to: string, options?: any) => void];
}
