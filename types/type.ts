export type Unit = {
  unit_id: string;
  name: string;
  hourly_rate: string;
  transmission: string;
  horsepower: string;
  engine_displacement: string;
  purchased_date: string;
  created_at: string;
  image_url: string;
};

export type RootStackParamList = {
  UnitDetails: { unit: Unit };
};
