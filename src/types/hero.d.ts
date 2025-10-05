export interface AppHero {
  heading: string
  subheading: string
}

export interface AuthHero extends AppHero {
  question: string
  linkLabel: string
  linkTo: string
}

export type HeroCollection = Record<string, AppHero | AuthHero>
