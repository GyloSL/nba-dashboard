export interface PlayerStats {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: [PlayerScore]
}

export interface PlayerScore {
  id: number | null;
  player_name: string;
  age: number | null;
  games: number | null;
  games_started: number | null;
  minutes_played: number | null;
  field_goals: number | null;
  field_attempts: number | null;
  field_percent: number | null;
  three_fg: number | null;
  three_attempts: number | null;
  three_percent: number | null;
  two_fg: number | null;
  two_attempts: number | null;
  two_percent: number | null;
  effect_fg_percent: number | null;
  ft: number | null;
  fta: number | null;
  ft_percent: number | null;
  ORB: number | null;
  DRB: number | null;
  TRB: number | null;
  AST: number | null;
  STL: number | null;
  BLK: number | null;
  TOV: number | null;
  PF: number | null;
  PTS: number | null;
  team: string;
  season: number | null
}
