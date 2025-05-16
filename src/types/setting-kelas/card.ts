export type CardProps = {
  id: string;
  name: string;
  dosen: string;
  date: string;
  classroom: string;
};

export type AddClassRequest = {
  course_id: string;
  lecturer: string;
  day: string;
  classroom: string;
  start_time: string;
  end_time: string;
  // hour_start: string;
  // hour_end: string;
  // minutes_start: string;
  // minutes_end: string;
};

export type AddClassForm = {
  course_id: string;
  lecturer: string;
  day: string;
  classroom: string;
  start_time: string;
  end_time: string;
  hour_start: string;
  hour_end: string;
  minutes_start: string;
  minutes_end: string;
};

export type EditClassData = {
  id: string;
  lecturer: string;
  course_id: string;
  day: string;
  start_time: string;
  end_time: string;
  classroom: string;
  hour_start: string;
  hour_end: string;
  minutes_start: string;
  minutes_end: string;
};
