interface Window {
  __MANUS_CONFIG__?: {
    projectId: string;
    oauthPortalUrl: string;
    apiUrl: string;
    apiBrowserKey: string;
  };
  google?: typeof google;
}

interface ImportMetaEnv {
  readonly VITE_APP_ID?: string;
  readonly VITE_OAUTH_PORTAL_URL?: string;
  readonly [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly dirname: string;
  readonly url: string;
}

interface Buffer extends Uint8Array {
  [key: string]: any;
}

declare var process: any;
declare var Buffer: {
  from(...args: any[]): Buffer;
  isBuffer(obj: any): boolean;
  [key: string]: any;
};

declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
  }
}

declare namespace google {
  namespace maps {
    type LatLngLiteral = { lat: number; lng: number };
    class Map {
      constructor(el: HTMLElement, opts?: any);
      [key: string]: any;
    }
    namespace marker {
      class AdvancedMarkerElement {
        constructor(opts?: any);
      }
    }
    namespace places {
      class Place {
        constructor(opts?: any);
        fetchFields(opts?: any): Promise<any>;
        location: any;
      }
    }
    class Geocoder {
      geocode(req: any, cb: (results: any, status: any) => void): void;
    }
    namespace geometry {
      namespace spherical {
        function computeDistanceBetween(p1: any, p2: any): number;
      }
    }
    class DirectionsService {
      route(req: any, cb: (res: any, status: any) => void): void;
    }
    class DirectionsRenderer {
      constructor(opts?: any);
      setDirections(res: any): void;
    }
    class TrafficLayer {
      setMap(map: any): void;
    }
    class TransitLayer {
      setMap(map: any): void;
    }
    class BicyclingLayer {
      setMap(map: any): void;
    }
  }
}

declare namespace React {
  type ReactNode = any;
  type ReactElement = any;
  type ComponentType<P = {}> = (props: P) => any;
  type FC<P = {}> = (props: P) => any;
  type ComponentProps<T = any> = any;
  type ComponentPropsWithoutRef<T = any> = any;
  type ElementRef<T = any> = any;
  type HTMLAttributes<T = any> = any;
  type ButtonHTMLAttributes<T = any> = any;
  type InputHTMLAttributes<T = any> = any;
  type TextareaHTMLAttributes<T = any> = any;
  type FormEvent<T = any> = any;
  type MouseEvent<T = any> = any;
  type KeyboardEvent<T = any> = any;
  type KeyboardEventHandler<T = any> = (e: any) => void;
  type CompositionEvent<T = any> = any;
  type CompositionEventHandler<T = any> = (e: any) => void;
  type ChangeEvent<T = any> = any;
  type CSSProperties = Record<string, any>;
  type Ref<T = any> = any;
  type RefObject<T = any> = { current: T };
  function useState<T = any>(initialState?: T | (() => T)): [T, (value: any) => void];
  function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  function useRef<T = any>(initialValue?: T): { current: T };
  function useCallback<T extends (...args: any[]) => any>(callback: T, deps?: readonly any[]): T;
  function useMemo<T = any>(factory: () => T, deps?: readonly any[]): T;
  function useId(): string;
  function createContext<T = any>(defaultValue?: T): any;
  function useContext<T = any>(context: any): T;
  function forwardRef<T = any, P = any>(render: (props: P, ref: any) => any): any;
  function createElement(type: any, props?: any, ...children: any[]): any;
  const Fragment: any;
  class Component<P = {}, S = {}> {
    props: P;
    state: S;
    constructor(props: P);
    setState(state: any): void;
    render(): any;
  }
}

declare namespace JSX {
  interface Element {}
  interface ElementChildrenAttribute {
    children: {};
  }
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module "*.css" {}

declare module "react" {
  export function useState<T = any>(initialState?: T | (() => T)): [T, (value: any) => void];
  export function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  export function useRef<T = any>(initialValue?: T): { current: T };
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps?: readonly any[]): T;
  export function useMemo<T = any>(factory: () => T, deps?: readonly any[]): T;
  export function useId(): string;
  export function createContext<T = any>(defaultValue?: T): any;
  export function useContext<T = any>(context: any): T;
  export function forwardRef<T = any, P = any>(render: (props: P, ref: any) => any): any;
  export function createElement(type: any, props?: any, ...children: any[]): any;
  export const Fragment: any;
  export class Component<P = {}, S = {}> {
    props: P;
    state: S;
    constructor(props: P);
    setState(state: any): void;
    render(): any;
  }
  export type ReactNode = any;
  export type ReactElement = any;
  export type ComponentType<P = {}> = (props: P) => any;
  export type FC<P = {}> = (props: P) => any;
  export type ComponentProps<T = any> = any;
  export type ComponentPropsWithoutRef<T = any> = any;
  export type ElementRef<T = any> = any;
  export type HTMLAttributes<T = any> = any;
  export type ButtonHTMLAttributes<T = any> = any;
  export type InputHTMLAttributes<T = any> = any;
  export type TextareaHTMLAttributes<T = any> = any;
  export type FormEvent<T = any> = any;
  export type MouseEvent<T = any> = any;
  export type KeyboardEvent<T = any> = any;
  export type KeyboardEventHandler<T = any> = (e: any) => void;
  export type CompositionEvent<T = any> = any;
  export type CompositionEventHandler<T = any> = (e: any) => void;
  export type ChangeEvent<T = any> = any;
  export type CSSProperties = Record<string, any>;
  export type Ref<T = any> = any;
  export type RefObject<T = any> = { current: T };
  export namespace JSX {
    interface Element {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
  const ReactDefault: typeof React;
  export default ReactDefault;
}

declare module "react/jsx-runtime" {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
  export namespace JSX {
    interface Element {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module "react/jsx-dev-runtime" {
  export const jsxDEV: any;
  export const Fragment: any;
  export namespace JSX {
    interface Element {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module "react-dom/client" {
  export function createRoot(container: any): { render(node: any): void };
}

declare module "lucide-react" {
  export type LucideProps = {
    size?: number | string;
    strokeWidth?: number | string;
    className?: string;
    [key: string]: any;
  };
  export type LucideIcon = (props: LucideProps) => any;
  export const AlertCircle: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const ArrowDownRight: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const Award: LucideIcon;
  export const BookOpen: LucideIcon;
  export const Bot: LucideIcon;
  export const BriefcaseBusiness: LucideIcon;
  export const Building2: LucideIcon;
  export const CalendarIcon: LucideIcon;
  export const Check: LucideIcon;
  export const CheckIcon: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronDownIcon: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronLeftIcon: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronRightIcon: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const ChevronUpIcon: LucideIcon;
  export const Circle: LucideIcon;
  export const CircleIcon: LucideIcon;
  export const Clock: LucideIcon;
  export const GraduationCap: LucideIcon;
  export const GripVerticalIcon: LucideIcon;
  export const HeartPulse: LucideIcon;
  export const Home: LucideIcon;
  export const Laptop: LucideIcon;
  export const LayoutDashboard: LucideIcon;
  export const Lightbulb: LucideIcon;
  export const Loader2: LucideIcon;
  export const Loader2Icon: LucideIcon;
  export const LogOut: LucideIcon;
  export const Mail: LucideIcon;
  export const MapPin: LucideIcon;
  export const Menu: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const MinusIcon: LucideIcon;
  export const Moon: LucideIcon;
  export const MoreHorizontal: LucideIcon;
  export const MoreHorizontalIcon: LucideIcon;
  export const PanelLeft: LucideIcon;
  export const PanelLeftIcon: LucideIcon;
  export const Phone: LucideIcon;
  export const Quote: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const Search: LucideIcon;
  export const SearchIcon: LucideIcon;
  export const Send: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Sun: LucideIcon;
  export const User: LucideIcon;
  export const Users: LucideIcon;
  export const X: LucideIcon;
  export const XIcon: LucideIcon;
  export const Zap: LucideIcon;
}

declare module "wouter" {
  export const Route: any;
  export const Switch: any;
  export const Link: any;
  export function useLocation(): [string, (to: string, options?: any) => void];
}

declare module "clsx" {
  export type ClassValue = any;
  export function clsx(...inputs: any[]): string;
  export default clsx;
}

declare module "tailwind-merge" {
  export function twMerge(...inputs: any[]): string;
}

declare module "class-variance-authority" {
  export type VariantProps<T = any> = any;
  export function cva(base?: any, config?: any): any;
}

declare module "sonner" {
  export type ToasterProps = any;
  export const Toaster: any;
  export const toast: any;
}

declare module "next-themes" {
  export function useTheme(): { theme?: string; setTheme?: (t: string) => void; [key: string]: any };
  export const ThemeProvider: any;
}

declare module "cmdk" {
  export const Command: any;
}

declare module "vaul" {
  export const Drawer: any;
}

declare module "input-otp" {
  export const OTPInput: any;
  export const OTPInputContext: any;
}

declare module "react-day-picker" {
  export const DayButton: any;
  export const DayPicker: any;
  export function getDefaultClassNames(): any;
}

declare module "date-fns" {
  export function format(date: any, fmt: string, opts?: any): string;
}

declare module "date-fns/locale" {
  export const zhCN: any;
}

declare module "embla-carousel-react" {
  export type UseEmblaCarouselType = any;
  const useEmblaCarousel: any;
  export default useEmblaCarousel;
}

declare module "recharts" {
  export const ResponsiveContainer: any;
  export const Tooltip: any;
  export const Legend: any;
  export type LegendProps = any;
  export type TooltipProps = any;
}

declare module "react-resizable-panels" {
  export const PanelGroup: any;
  export const Panel: any;
  export const PanelResizeHandle: any;
}

declare module "react-hook-form" {
  export type ControllerProps<T = any, N = any> = any;
  export type FieldPath<T = any> = any;
  export type FieldValues = any;
  export const Controller: any;
  export const FormProvider: any;
  export function useFormContext(): any;
  export function useFormState(opts?: any): any;
}

declare module "streamdown" {
  export const Streamdown: any;
}

declare module "nanoid" {
  export function nanoid(size?: number): string;
}

declare module "superjson" {
  const superjson: any;
  export default superjson;
}

declare module "@tanstack/react-query" {
  export class QueryClient {
    constructor(opts?: any);
    [key: string]: any;
  }
  export const QueryClientProvider: any;
}

declare module "@trpc/client" {
  export class TRPCClientError<T = any> extends Error {
    data?: any;
  }
  export function httpBatchLink(opts?: any): any;
}

declare module "@trpc/react-query" {
  export function createTRPCReact<T = any>(): any;
}

declare module "@trpc/server" {
  export class TRPCError extends Error {
    code: string;
    constructor(opts: { code: string; message?: string; cause?: any });
  }
  export const initTRPC: {
    context<T = any>(): { create(opts?: any): any };
    create(opts?: any): any;
  };
}

declare module "@trpc/server/adapters/express" {
  export type CreateExpressContextOptions = any;
  export function createExpressMiddleware(opts?: any): any;
}

declare module "zod" {
  export const z: any;
}

declare module "@radix-ui/react-accordion" { const m: any; export = m; }
declare module "@radix-ui/react-alert-dialog" { const m: any; export = m; }
declare module "@radix-ui/react-aspect-ratio" { const m: any; export = m; }
declare module "@radix-ui/react-avatar" { const m: any; export = m; }
declare module "@radix-ui/react-checkbox" { const m: any; export = m; }
declare module "@radix-ui/react-collapsible" { const m: any; export = m; }
declare module "@radix-ui/react-context-menu" { const m: any; export = m; }
declare module "@radix-ui/react-dialog" { const m: any; export = m; }
declare module "@radix-ui/react-dropdown-menu" { const m: any; export = m; }
declare module "@radix-ui/react-hover-card" { const m: any; export = m; }
declare module "@radix-ui/react-label" { const m: any; export = m; }
declare module "@radix-ui/react-menubar" { const m: any; export = m; }
declare module "@radix-ui/react-navigation-menu" { const m: any; export = m; }
declare module "@radix-ui/react-popover" { const m: any; export = m; }
declare module "@radix-ui/react-progress" { const m: any; export = m; }
declare module "@radix-ui/react-radio-group" { const m: any; export = m; }
declare module "@radix-ui/react-scroll-area" { const m: any; export = m; }
declare module "@radix-ui/react-select" { const m: any; export = m; }
declare module "@radix-ui/react-separator" { const m: any; export = m; }
declare module "@radix-ui/react-slider" { const m: any; export = m; }
declare module "@radix-ui/react-slot" { export const Slot: any; }
declare module "@radix-ui/react-switch" { const m: any; export = m; }
declare module "@radix-ui/react-tabs" { const m: any; export = m; }
declare module "@radix-ui/react-toggle" { const m: any; export = m; }
declare module "@radix-ui/react-toggle-group" { const m: any; export = m; }
declare module "@radix-ui/react-tooltip" { const m: any; export = m; }

declare module "dotenv/config" {}

declare module "express" {
  export type Express = any;
  export type Request = any;
  export type Response = any;
  export type CookieOptions = any;
  const express: any;
  export default express;
}

declare module "cookie" {
  export function parse(str: string, options?: any): Record<string, string>;
}

declare module "jose" {
  export class SignJWT {
    constructor(payload?: any);
    setProtectedHeader(header: any): this;
    setExpirationTime(exp: any): this;
    sign(secret: any): Promise<string>;
  }
  export function jwtVerify(jwt: any, secret: any, options?: any): Promise<any>;
}

declare module "axios" {
  export interface AxiosInstance {
    get<T = any>(url: string, config?: any): Promise<{ data: T }>;
    post<T = any>(url: string, data?: any, config?: any): Promise<{ data: T }>;
    [key: string]: any;
  }
  const axios: {
    create(config?: any): AxiosInstance;
    get<T = any>(url: string, config?: any): Promise<{ data: T }>;
    post<T = any>(url: string, data?: any, config?: any): Promise<{ data: T }>;
    isAxiosError(err: any): boolean;
    [key: string]: any;
  };
  export default axios;
}

declare module "drizzle-orm" {
  export function eq(a: any, b: any): any;
}

declare module "drizzle-orm/mysql2" {
  export function drizzle(...args: any[]): any;
}

declare module "drizzle-orm/mysql-core" {
  export function int(...args: any[]): any;
  export function mysqlEnum(...args: any[]): any;
  export function mysqlTable(...args: any[]): any;
  export function text(...args: any[]): any;
  export function timestamp(...args: any[]): any;
  export function varchar(...args: any[]): any;
}

declare module "drizzle-kit" {
  export function defineConfig(config: any): any;
}

declare module "vite" {
  export type Plugin = any;
  export type ViteDevServer = any;
  export function defineConfig(config: any): any;
  export function createServer(config?: any): Promise<any>;
}

declare module "@vitejs/plugin-react" {
  const react: any;
  export default react;
}

declare module "@tailwindcss/vite" {
  const tailwindcss: any;
  export default tailwindcss;
}

declare module "@builder.io/vite-plugin-jsx-loc" {
  export function jsxLocPlugin(opts?: any): any;
}

declare module "vitest" {
  export const describe: any;
  export const it: any;
  export const expect: any;
  export const afterEach: any;
  export const vi: any;
}

declare module "vitest/config" {
  export function defineConfig(config: any): any;
}

declare module "fs" {
  const fs: any;
  export default fs;
  export const existsSync: any;
  export const readFileSync: any;
  export const promises: any;
}

declare module "node:fs" {
  const fs: any;
  export default fs;
  export const existsSync: any;
  export const readFileSync: any;
  export const writeFileSync: any;
  export const mkdirSync: any;
}

declare module "path" {
  const path: any;
  export default path;
  export const resolve: any;
  export const join: any;
  export const dirname: any;
}

declare module "node:path" {
  const path: any;
  export default path;
  export const resolve: any;
  export const join: any;
  export const dirname: any;
}

declare module "http" {
  export type Server = any;
  export function createServer(...args: any[]): any;
}

