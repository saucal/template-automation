// Typed config model — replaces the GI Record<string,string> vars bag.
//
// Open Studio is a single-host subscription membership + course site. The variant
// axis is AUDIENCE (guest vs member), not region. Join always goes through the
// FunnelKit funnel; the upsell step is best-effort (non-fatal if absent).
//
// DOM-first project: no WC REST. SuiteVars is DOM-read in beforeAll, not fetched.

export type Audience = 'guest' | 'member';
export type Frequency = 'monthly' | 'annually';
export type SurveyChoice = 'submit' | 'skip';
export type UpsellChoice = 'accept' | 'skip';

/** Welcome-page survey answers (instrument + skill level). */
export interface SurveyConfig {
  instrument: string;
  skillLevel: string;
}

/** A member account — generated per run (unique email) or seeded from .env. */
export interface UserConfig {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface JoinConfig {
  /** stable id, e.g. 'OS-JOIN-01' */
  testId: string;
  /** human title for reports */
  title: string;
  frequency: Frequency;
  survey: SurveyChoice;
  /** best-effort: honored only if the funnel serves an upsell page. */
  upsell: UpsellChoice;
  surveyData: SurveyConfig;
}

export interface OrderResult {
  orderNumber: string;
  email: string;
  /** total as rendered, e.g. '$19.00' */
  total: string;
  /** payment-method label on order surfaces, e.g. 'Credit / Debit Card'. */
  paymentLabel: string;
  /** subscription number, when the order created one. */
  subscriptionId?: string;
}

export interface SubscriptionConfig {
  testId: string;
  title: string;
  product: 'open-studio';
  frequency: Frequency;
  /** subscription next-payment dates render in Central time. */
  nextPaymentTz: 'America/Chicago';
}

export interface CourseConfig {
  testId: string;
  title: string;
  /** product slug, e.g. 'jazz-piano-jump-start-course'. */
  slug: string;
  /** add a membership subscription alongside the course in one cart. */
  withSubscription: boolean;
}

/** Site-level values, DOM-read once in beforeAll. */
export interface SuiteVars {
  /** site title — parallel-safe filter for shared inboxes / parity. */
  title: string;
}
