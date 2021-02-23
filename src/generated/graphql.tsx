import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _text: any;
  date: any;
  numeric: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};


/** expression to compare columns of type _text. All fields are combined with logical 'AND'. */
export type _Text_Comparison_Exp = {
  _eq?: Maybe<Scalars['_text']>;
  _gt?: Maybe<Scalars['_text']>;
  _gte?: Maybe<Scalars['_text']>;
  _in?: Maybe<Array<Scalars['_text']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['_text']>;
  _lte?: Maybe<Scalars['_text']>;
  _neq?: Maybe<Scalars['_text']>;
  _nin?: Maybe<Array<Scalars['_text']>>;
};

/** columns and relationships of "attendance" */
export type Attendance = {
  __typename?: 'attendance';
  attended: Scalars['Boolean'];
  date: Scalars['date'];
  id: Scalars['Int'];
  status?: Maybe<Scalars['String']>;
  /** An object relationship */
  student: Students;
  student_id: Scalars['Int'];
};

/** aggregated selection of "attendance" */
export type Attendance_Aggregate = {
  __typename?: 'attendance_aggregate';
  aggregate?: Maybe<Attendance_Aggregate_Fields>;
  nodes: Array<Attendance>;
};

/** aggregate fields of "attendance" */
export type Attendance_Aggregate_Fields = {
  __typename?: 'attendance_aggregate_fields';
  avg?: Maybe<Attendance_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Attendance_Max_Fields>;
  min?: Maybe<Attendance_Min_Fields>;
  stddev?: Maybe<Attendance_Stddev_Fields>;
  stddev_pop?: Maybe<Attendance_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Attendance_Stddev_Samp_Fields>;
  sum?: Maybe<Attendance_Sum_Fields>;
  var_pop?: Maybe<Attendance_Var_Pop_Fields>;
  var_samp?: Maybe<Attendance_Var_Samp_Fields>;
  variance?: Maybe<Attendance_Variance_Fields>;
};


/** aggregate fields of "attendance" */
export type Attendance_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Attendance_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "attendance" */
export type Attendance_Aggregate_Order_By = {
  avg?: Maybe<Attendance_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Attendance_Max_Order_By>;
  min?: Maybe<Attendance_Min_Order_By>;
  stddev?: Maybe<Attendance_Stddev_Order_By>;
  stddev_pop?: Maybe<Attendance_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Attendance_Stddev_Samp_Order_By>;
  sum?: Maybe<Attendance_Sum_Order_By>;
  var_pop?: Maybe<Attendance_Var_Pop_Order_By>;
  var_samp?: Maybe<Attendance_Var_Samp_Order_By>;
  variance?: Maybe<Attendance_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "attendance" */
export type Attendance_Arr_Rel_Insert_Input = {
  data: Array<Attendance_Insert_Input>;
  on_conflict?: Maybe<Attendance_On_Conflict>;
};

/** aggregate avg on columns */
export type Attendance_Avg_Fields = {
  __typename?: 'attendance_avg_fields';
  id?: Maybe<Scalars['Float']>;
  student_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "attendance" */
export type Attendance_Avg_Order_By = {
  id?: Maybe<Order_By>;
  student_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "attendance". All fields are combined with a logical 'AND'. */
export type Attendance_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Attendance_Bool_Exp>>>;
  _not?: Maybe<Attendance_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Attendance_Bool_Exp>>>;
  attended?: Maybe<Boolean_Comparison_Exp>;
  date?: Maybe<Date_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  status?: Maybe<String_Comparison_Exp>;
  student?: Maybe<Students_Bool_Exp>;
  student_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "attendance" */
export enum Attendance_Constraint {
  /** unique or primary key constraint */
  AttendancePkey = 'attendance_pkey'
}

/** input type for incrementing integer column in table "attendance" */
export type Attendance_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  student_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "attendance" */
export type Attendance_Insert_Input = {
  attended?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  student?: Maybe<Students_Obj_Rel_Insert_Input>;
  student_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Attendance_Max_Fields = {
  __typename?: 'attendance_max_fields';
  date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "attendance" */
export type Attendance_Max_Order_By = {
  date?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  student_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Attendance_Min_Fields = {
  __typename?: 'attendance_min_fields';
  date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "attendance" */
export type Attendance_Min_Order_By = {
  date?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  student_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "attendance" */
export type Attendance_Mutation_Response = {
  __typename?: 'attendance_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Attendance>;
};

/** input type for inserting object relation for remote table "attendance" */
export type Attendance_Obj_Rel_Insert_Input = {
  data: Attendance_Insert_Input;
  on_conflict?: Maybe<Attendance_On_Conflict>;
};

/** on conflict condition type for table "attendance" */
export type Attendance_On_Conflict = {
  constraint: Attendance_Constraint;
  update_columns: Array<Attendance_Update_Column>;
  where?: Maybe<Attendance_Bool_Exp>;
};

/** ordering options when selecting data from "attendance" */
export type Attendance_Order_By = {
  attended?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  student?: Maybe<Students_Order_By>;
  student_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "attendance" */
export type Attendance_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "attendance" */
export enum Attendance_Select_Column {
  /** column name */
  Attended = 'attended',
  /** column name */
  Date = 'date',
  /** column name */
  Id = 'id',
  /** column name */
  Status = 'status',
  /** column name */
  StudentId = 'student_id'
}

/** input type for updating data in table "attendance" */
export type Attendance_Set_Input = {
  attended?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  student_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Attendance_Stddev_Fields = {
  __typename?: 'attendance_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  student_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "attendance" */
export type Attendance_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  student_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Attendance_Stddev_Pop_Fields = {
  __typename?: 'attendance_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  student_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "attendance" */
export type Attendance_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  student_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Attendance_Stddev_Samp_Fields = {
  __typename?: 'attendance_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  student_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "attendance" */
export type Attendance_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  student_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Attendance_Sum_Fields = {
  __typename?: 'attendance_sum_fields';
  id?: Maybe<Scalars['Int']>;
  student_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "attendance" */
export type Attendance_Sum_Order_By = {
  id?: Maybe<Order_By>;
  student_id?: Maybe<Order_By>;
};

/** update columns of table "attendance" */
export enum Attendance_Update_Column {
  /** column name */
  Attended = 'attended',
  /** column name */
  Date = 'date',
  /** column name */
  Id = 'id',
  /** column name */
  Status = 'status',
  /** column name */
  StudentId = 'student_id'
}

/** aggregate var_pop on columns */
export type Attendance_Var_Pop_Fields = {
  __typename?: 'attendance_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  student_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "attendance" */
export type Attendance_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  student_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Attendance_Var_Samp_Fields = {
  __typename?: 'attendance_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  student_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "attendance" */
export type Attendance_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  student_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Attendance_Variance_Fields = {
  __typename?: 'attendance_variance_fields';
  id?: Maybe<Scalars['Float']>;
  student_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "attendance" */
export type Attendance_Variance_Order_By = {
  id?: Maybe<Order_By>;
  student_id?: Maybe<Order_By>;
};


/** expression to compare columns of type date. All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: Maybe<Scalars['date']>;
  _gt?: Maybe<Scalars['date']>;
  _gte?: Maybe<Scalars['date']>;
  _in?: Maybe<Array<Scalars['date']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['date']>;
  _lte?: Maybe<Scalars['date']>;
  _neq?: Maybe<Scalars['date']>;
  _nin?: Maybe<Array<Scalars['date']>>;
};

/** columns and relationships of "groups" */
export type Groups = {
  __typename?: 'groups';
  current_month?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['date']>;
  days?: Maybe<Scalars['_text']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  /** An array relationship */
  students: Array<Students>;
  /** An aggregated array relationship */
  students_aggregate: Students_Aggregate;
};


/** columns and relationships of "groups" */
export type GroupsStudentsArgs = {
  distinct_on?: Maybe<Array<Students_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Students_Order_By>>;
  where?: Maybe<Students_Bool_Exp>;
};


/** columns and relationships of "groups" */
export type GroupsStudents_AggregateArgs = {
  distinct_on?: Maybe<Array<Students_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Students_Order_By>>;
  where?: Maybe<Students_Bool_Exp>;
};

/** aggregated selection of "groups" */
export type Groups_Aggregate = {
  __typename?: 'groups_aggregate';
  aggregate?: Maybe<Groups_Aggregate_Fields>;
  nodes: Array<Groups>;
};

/** aggregate fields of "groups" */
export type Groups_Aggregate_Fields = {
  __typename?: 'groups_aggregate_fields';
  avg?: Maybe<Groups_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Groups_Max_Fields>;
  min?: Maybe<Groups_Min_Fields>;
  stddev?: Maybe<Groups_Stddev_Fields>;
  stddev_pop?: Maybe<Groups_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Groups_Stddev_Samp_Fields>;
  sum?: Maybe<Groups_Sum_Fields>;
  var_pop?: Maybe<Groups_Var_Pop_Fields>;
  var_samp?: Maybe<Groups_Var_Samp_Fields>;
  variance?: Maybe<Groups_Variance_Fields>;
};


/** aggregate fields of "groups" */
export type Groups_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Groups_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "groups" */
export type Groups_Aggregate_Order_By = {
  avg?: Maybe<Groups_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Groups_Max_Order_By>;
  min?: Maybe<Groups_Min_Order_By>;
  stddev?: Maybe<Groups_Stddev_Order_By>;
  stddev_pop?: Maybe<Groups_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Groups_Stddev_Samp_Order_By>;
  sum?: Maybe<Groups_Sum_Order_By>;
  var_pop?: Maybe<Groups_Var_Pop_Order_By>;
  var_samp?: Maybe<Groups_Var_Samp_Order_By>;
  variance?: Maybe<Groups_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "groups" */
export type Groups_Arr_Rel_Insert_Input = {
  data: Array<Groups_Insert_Input>;
  on_conflict?: Maybe<Groups_On_Conflict>;
};

/** aggregate avg on columns */
export type Groups_Avg_Fields = {
  __typename?: 'groups_avg_fields';
  current_month?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "groups" */
export type Groups_Avg_Order_By = {
  current_month?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "groups". All fields are combined with a logical 'AND'. */
export type Groups_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Groups_Bool_Exp>>>;
  _not?: Maybe<Groups_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Groups_Bool_Exp>>>;
  current_month?: Maybe<Numeric_Comparison_Exp>;
  date?: Maybe<Date_Comparison_Exp>;
  days?: Maybe<_Text_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  students?: Maybe<Students_Bool_Exp>;
};

/** unique or primary key constraints on table "groups" */
export enum Groups_Constraint {
  /** unique or primary key constraint */
  GroupsNameKey = 'groups_name_key',
  /** unique or primary key constraint */
  GroupsPkey = 'groups_pkey'
}

/** input type for incrementing integer column in table "groups" */
export type Groups_Inc_Input = {
  current_month?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "groups" */
export type Groups_Insert_Input = {
  current_month?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['date']>;
  days?: Maybe<Scalars['_text']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  students?: Maybe<Students_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Groups_Max_Fields = {
  __typename?: 'groups_max_fields';
  current_month?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "groups" */
export type Groups_Max_Order_By = {
  current_month?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Groups_Min_Fields = {
  __typename?: 'groups_min_fields';
  current_month?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "groups" */
export type Groups_Min_Order_By = {
  current_month?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** response of any mutation on the table "groups" */
export type Groups_Mutation_Response = {
  __typename?: 'groups_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Groups>;
};

/** input type for inserting object relation for remote table "groups" */
export type Groups_Obj_Rel_Insert_Input = {
  data: Groups_Insert_Input;
  on_conflict?: Maybe<Groups_On_Conflict>;
};

/** on conflict condition type for table "groups" */
export type Groups_On_Conflict = {
  constraint: Groups_Constraint;
  update_columns: Array<Groups_Update_Column>;
  where?: Maybe<Groups_Bool_Exp>;
};

/** ordering options when selecting data from "groups" */
export type Groups_Order_By = {
  current_month?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  days?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  students_aggregate?: Maybe<Students_Aggregate_Order_By>;
};

/** primary key columns input for table: "groups" */
export type Groups_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "groups" */
export enum Groups_Select_Column {
  /** column name */
  CurrentMonth = 'current_month',
  /** column name */
  Date = 'date',
  /** column name */
  Days = 'days',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "groups" */
export type Groups_Set_Input = {
  current_month?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['date']>;
  days?: Maybe<Scalars['_text']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Groups_Stddev_Fields = {
  __typename?: 'groups_stddev_fields';
  current_month?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "groups" */
export type Groups_Stddev_Order_By = {
  current_month?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Groups_Stddev_Pop_Fields = {
  __typename?: 'groups_stddev_pop_fields';
  current_month?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "groups" */
export type Groups_Stddev_Pop_Order_By = {
  current_month?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Groups_Stddev_Samp_Fields = {
  __typename?: 'groups_stddev_samp_fields';
  current_month?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "groups" */
export type Groups_Stddev_Samp_Order_By = {
  current_month?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Groups_Sum_Fields = {
  __typename?: 'groups_sum_fields';
  current_month?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "groups" */
export type Groups_Sum_Order_By = {
  current_month?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** update columns of table "groups" */
export enum Groups_Update_Column {
  /** column name */
  CurrentMonth = 'current_month',
  /** column name */
  Date = 'date',
  /** column name */
  Days = 'days',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type Groups_Var_Pop_Fields = {
  __typename?: 'groups_var_pop_fields';
  current_month?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "groups" */
export type Groups_Var_Pop_Order_By = {
  current_month?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Groups_Var_Samp_Fields = {
  __typename?: 'groups_var_samp_fields';
  current_month?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "groups" */
export type Groups_Var_Samp_Order_By = {
  current_month?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Groups_Variance_Fields = {
  __typename?: 'groups_variance_fields';
  current_month?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "groups" */
export type Groups_Variance_Order_By = {
  current_month?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "attendance" */
  delete_attendance?: Maybe<Attendance_Mutation_Response>;
  /** delete single row from the table: "attendance" */
  delete_attendance_by_pk?: Maybe<Attendance>;
  /** delete data from the table: "groups" */
  delete_groups?: Maybe<Groups_Mutation_Response>;
  /** delete single row from the table: "groups" */
  delete_groups_by_pk?: Maybe<Groups>;
  /** delete data from the table: "students" */
  delete_students?: Maybe<Students_Mutation_Response>;
  /** delete single row from the table: "students" */
  delete_students_by_pk?: Maybe<Students>;
  /** insert data into the table: "attendance" */
  insert_attendance?: Maybe<Attendance_Mutation_Response>;
  /** insert a single row into the table: "attendance" */
  insert_attendance_one?: Maybe<Attendance>;
  /** insert data into the table: "groups" */
  insert_groups?: Maybe<Groups_Mutation_Response>;
  /** insert a single row into the table: "groups" */
  insert_groups_one?: Maybe<Groups>;
  /** insert data into the table: "students" */
  insert_students?: Maybe<Students_Mutation_Response>;
  /** insert a single row into the table: "students" */
  insert_students_one?: Maybe<Students>;
  /** update data of the table: "attendance" */
  update_attendance?: Maybe<Attendance_Mutation_Response>;
  /** update single row of the table: "attendance" */
  update_attendance_by_pk?: Maybe<Attendance>;
  /** update data of the table: "groups" */
  update_groups?: Maybe<Groups_Mutation_Response>;
  /** update single row of the table: "groups" */
  update_groups_by_pk?: Maybe<Groups>;
  /** update data of the table: "students" */
  update_students?: Maybe<Students_Mutation_Response>;
  /** update single row of the table: "students" */
  update_students_by_pk?: Maybe<Students>;
};


/** mutation root */
export type Mutation_RootDelete_AttendanceArgs = {
  where: Attendance_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Attendance_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_GroupsArgs = {
  where: Groups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Groups_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_StudentsArgs = {
  where: Students_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Students_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_AttendanceArgs = {
  objects: Array<Attendance_Insert_Input>;
  on_conflict?: Maybe<Attendance_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Attendance_OneArgs = {
  object: Attendance_Insert_Input;
  on_conflict?: Maybe<Attendance_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GroupsArgs = {
  objects: Array<Groups_Insert_Input>;
  on_conflict?: Maybe<Groups_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Groups_OneArgs = {
  object: Groups_Insert_Input;
  on_conflict?: Maybe<Groups_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_StudentsArgs = {
  objects: Array<Students_Insert_Input>;
  on_conflict?: Maybe<Students_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Students_OneArgs = {
  object: Students_Insert_Input;
  on_conflict?: Maybe<Students_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AttendanceArgs = {
  _inc?: Maybe<Attendance_Inc_Input>;
  _set?: Maybe<Attendance_Set_Input>;
  where: Attendance_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Attendance_By_PkArgs = {
  _inc?: Maybe<Attendance_Inc_Input>;
  _set?: Maybe<Attendance_Set_Input>;
  pk_columns: Attendance_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_GroupsArgs = {
  _inc?: Maybe<Groups_Inc_Input>;
  _set?: Maybe<Groups_Set_Input>;
  where: Groups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Groups_By_PkArgs = {
  _inc?: Maybe<Groups_Inc_Input>;
  _set?: Maybe<Groups_Set_Input>;
  pk_columns: Groups_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_StudentsArgs = {
  _inc?: Maybe<Students_Inc_Input>;
  _set?: Maybe<Students_Set_Input>;
  where: Students_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Students_By_PkArgs = {
  _inc?: Maybe<Students_Inc_Input>;
  _set?: Maybe<Students_Set_Input>;
  pk_columns: Students_Pk_Columns_Input;
};


/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: Maybe<Scalars['numeric']>;
  _gt?: Maybe<Scalars['numeric']>;
  _gte?: Maybe<Scalars['numeric']>;
  _in?: Maybe<Array<Scalars['numeric']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['numeric']>;
  _lte?: Maybe<Scalars['numeric']>;
  _neq?: Maybe<Scalars['numeric']>;
  _nin?: Maybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "attendance" */
  attendance: Array<Attendance>;
  /** fetch aggregated fields from the table: "attendance" */
  attendance_aggregate: Attendance_Aggregate;
  /** fetch data from the table: "attendance" using primary key columns */
  attendance_by_pk?: Maybe<Attendance>;
  /** fetch data from the table: "groups" */
  groups: Array<Groups>;
  /** fetch aggregated fields from the table: "groups" */
  groups_aggregate: Groups_Aggregate;
  /** fetch data from the table: "groups" using primary key columns */
  groups_by_pk?: Maybe<Groups>;
  /** fetch data from the table: "students" */
  students: Array<Students>;
  /** fetch aggregated fields from the table: "students" */
  students_aggregate: Students_Aggregate;
  /** fetch data from the table: "students" using primary key columns */
  students_by_pk?: Maybe<Students>;
};


/** query root */
export type Query_RootAttendanceArgs = {
  distinct_on?: Maybe<Array<Attendance_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Attendance_Order_By>>;
  where?: Maybe<Attendance_Bool_Exp>;
};


/** query root */
export type Query_RootAttendance_AggregateArgs = {
  distinct_on?: Maybe<Array<Attendance_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Attendance_Order_By>>;
  where?: Maybe<Attendance_Bool_Exp>;
};


/** query root */
export type Query_RootAttendance_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootGroupsArgs = {
  distinct_on?: Maybe<Array<Groups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Groups_Order_By>>;
  where?: Maybe<Groups_Bool_Exp>;
};


/** query root */
export type Query_RootGroups_AggregateArgs = {
  distinct_on?: Maybe<Array<Groups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Groups_Order_By>>;
  where?: Maybe<Groups_Bool_Exp>;
};


/** query root */
export type Query_RootGroups_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootStudentsArgs = {
  distinct_on?: Maybe<Array<Students_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Students_Order_By>>;
  where?: Maybe<Students_Bool_Exp>;
};


/** query root */
export type Query_RootStudents_AggregateArgs = {
  distinct_on?: Maybe<Array<Students_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Students_Order_By>>;
  where?: Maybe<Students_Bool_Exp>;
};


/** query root */
export type Query_RootStudents_By_PkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "students" */
export type Students = {
  __typename?: 'students';
  /** An array relationship */
  attendances: Array<Attendance>;
  /** An aggregated array relationship */
  attendances_aggregate: Attendance_Aggregate;
  /** An object relationship */
  group?: Maybe<Groups>;
  group_id?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  name: Scalars['String'];
};


/** columns and relationships of "students" */
export type StudentsAttendancesArgs = {
  distinct_on?: Maybe<Array<Attendance_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Attendance_Order_By>>;
  where?: Maybe<Attendance_Bool_Exp>;
};


/** columns and relationships of "students" */
export type StudentsAttendances_AggregateArgs = {
  distinct_on?: Maybe<Array<Attendance_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Attendance_Order_By>>;
  where?: Maybe<Attendance_Bool_Exp>;
};

/** aggregated selection of "students" */
export type Students_Aggregate = {
  __typename?: 'students_aggregate';
  aggregate?: Maybe<Students_Aggregate_Fields>;
  nodes: Array<Students>;
};

/** aggregate fields of "students" */
export type Students_Aggregate_Fields = {
  __typename?: 'students_aggregate_fields';
  avg?: Maybe<Students_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Students_Max_Fields>;
  min?: Maybe<Students_Min_Fields>;
  stddev?: Maybe<Students_Stddev_Fields>;
  stddev_pop?: Maybe<Students_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Students_Stddev_Samp_Fields>;
  sum?: Maybe<Students_Sum_Fields>;
  var_pop?: Maybe<Students_Var_Pop_Fields>;
  var_samp?: Maybe<Students_Var_Samp_Fields>;
  variance?: Maybe<Students_Variance_Fields>;
};


/** aggregate fields of "students" */
export type Students_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Students_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "students" */
export type Students_Aggregate_Order_By = {
  avg?: Maybe<Students_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Students_Max_Order_By>;
  min?: Maybe<Students_Min_Order_By>;
  stddev?: Maybe<Students_Stddev_Order_By>;
  stddev_pop?: Maybe<Students_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Students_Stddev_Samp_Order_By>;
  sum?: Maybe<Students_Sum_Order_By>;
  var_pop?: Maybe<Students_Var_Pop_Order_By>;
  var_samp?: Maybe<Students_Var_Samp_Order_By>;
  variance?: Maybe<Students_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "students" */
export type Students_Arr_Rel_Insert_Input = {
  data: Array<Students_Insert_Input>;
  on_conflict?: Maybe<Students_On_Conflict>;
};

/** aggregate avg on columns */
export type Students_Avg_Fields = {
  __typename?: 'students_avg_fields';
  group_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "students" */
export type Students_Avg_Order_By = {
  group_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "students". All fields are combined with a logical 'AND'. */
export type Students_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Students_Bool_Exp>>>;
  _not?: Maybe<Students_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Students_Bool_Exp>>>;
  attendances?: Maybe<Attendance_Bool_Exp>;
  group?: Maybe<Groups_Bool_Exp>;
  group_id?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "students" */
export enum Students_Constraint {
  /** unique or primary key constraint */
  StudentsPkey = 'students_pkey'
}

/** input type for incrementing integer column in table "students" */
export type Students_Inc_Input = {
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "students" */
export type Students_Insert_Input = {
  attendances?: Maybe<Attendance_Arr_Rel_Insert_Input>;
  group?: Maybe<Groups_Obj_Rel_Insert_Input>;
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Students_Max_Fields = {
  __typename?: 'students_max_fields';
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "students" */
export type Students_Max_Order_By = {
  group_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Students_Min_Fields = {
  __typename?: 'students_min_fields';
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "students" */
export type Students_Min_Order_By = {
  group_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** response of any mutation on the table "students" */
export type Students_Mutation_Response = {
  __typename?: 'students_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Students>;
};

/** input type for inserting object relation for remote table "students" */
export type Students_Obj_Rel_Insert_Input = {
  data: Students_Insert_Input;
  on_conflict?: Maybe<Students_On_Conflict>;
};

/** on conflict condition type for table "students" */
export type Students_On_Conflict = {
  constraint: Students_Constraint;
  update_columns: Array<Students_Update_Column>;
  where?: Maybe<Students_Bool_Exp>;
};

/** ordering options when selecting data from "students" */
export type Students_Order_By = {
  attendances_aggregate?: Maybe<Attendance_Aggregate_Order_By>;
  group?: Maybe<Groups_Order_By>;
  group_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** primary key columns input for table: "students" */
export type Students_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "students" */
export enum Students_Select_Column {
  /** column name */
  GroupId = 'group_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "students" */
export type Students_Set_Input = {
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Students_Stddev_Fields = {
  __typename?: 'students_stddev_fields';
  group_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "students" */
export type Students_Stddev_Order_By = {
  group_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Students_Stddev_Pop_Fields = {
  __typename?: 'students_stddev_pop_fields';
  group_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "students" */
export type Students_Stddev_Pop_Order_By = {
  group_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Students_Stddev_Samp_Fields = {
  __typename?: 'students_stddev_samp_fields';
  group_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "students" */
export type Students_Stddev_Samp_Order_By = {
  group_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Students_Sum_Fields = {
  __typename?: 'students_sum_fields';
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "students" */
export type Students_Sum_Order_By = {
  group_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** update columns of table "students" */
export enum Students_Update_Column {
  /** column name */
  GroupId = 'group_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type Students_Var_Pop_Fields = {
  __typename?: 'students_var_pop_fields';
  group_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "students" */
export type Students_Var_Pop_Order_By = {
  group_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Students_Var_Samp_Fields = {
  __typename?: 'students_var_samp_fields';
  group_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "students" */
export type Students_Var_Samp_Order_By = {
  group_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Students_Variance_Fields = {
  __typename?: 'students_variance_fields';
  group_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "students" */
export type Students_Variance_Order_By = {
  group_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "attendance" */
  attendance: Array<Attendance>;
  /** fetch aggregated fields from the table: "attendance" */
  attendance_aggregate: Attendance_Aggregate;
  /** fetch data from the table: "attendance" using primary key columns */
  attendance_by_pk?: Maybe<Attendance>;
  /** fetch data from the table: "groups" */
  groups: Array<Groups>;
  /** fetch aggregated fields from the table: "groups" */
  groups_aggregate: Groups_Aggregate;
  /** fetch data from the table: "groups" using primary key columns */
  groups_by_pk?: Maybe<Groups>;
  /** fetch data from the table: "students" */
  students: Array<Students>;
  /** fetch aggregated fields from the table: "students" */
  students_aggregate: Students_Aggregate;
  /** fetch data from the table: "students" using primary key columns */
  students_by_pk?: Maybe<Students>;
};


/** subscription root */
export type Subscription_RootAttendanceArgs = {
  distinct_on?: Maybe<Array<Attendance_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Attendance_Order_By>>;
  where?: Maybe<Attendance_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAttendance_AggregateArgs = {
  distinct_on?: Maybe<Array<Attendance_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Attendance_Order_By>>;
  where?: Maybe<Attendance_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAttendance_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootGroupsArgs = {
  distinct_on?: Maybe<Array<Groups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Groups_Order_By>>;
  where?: Maybe<Groups_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGroups_AggregateArgs = {
  distinct_on?: Maybe<Array<Groups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Groups_Order_By>>;
  where?: Maybe<Groups_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGroups_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootStudentsArgs = {
  distinct_on?: Maybe<Array<Students_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Students_Order_By>>;
  where?: Maybe<Students_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudents_AggregateArgs = {
  distinct_on?: Maybe<Array<Students_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Students_Order_By>>;
  where?: Maybe<Students_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootStudents_By_PkArgs = {
  id: Scalars['Int'];
};

export type CreateAttendanceMutationVariables = Exact<{
  object: Attendance_Insert_Input;
}>;


export type CreateAttendanceMutation = (
  { __typename?: 'mutation_root' }
  & { insert_attendance_one?: Maybe<(
    { __typename?: 'attendance' }
    & Pick<Attendance, 'attended' | 'date' | 'id' | 'student_id'>
  )> }
);

export type CreateGroupMutationVariables = Exact<{
  object: Groups_Insert_Input;
}>;


export type CreateGroupMutation = (
  { __typename?: 'mutation_root' }
  & { insert_groups_one?: Maybe<(
    { __typename?: 'groups' }
    & Pick<Groups, 'id' | 'name' | 'date'>
  )> }
);

export type CreateStudentMutationVariables = Exact<{
  object: Students_Insert_Input;
}>;


export type CreateStudentMutation = (
  { __typename?: 'mutation_root' }
  & { insert_students_one?: Maybe<(
    { __typename?: 'students' }
    & Pick<Students, 'id' | 'name'>
  )> }
);

export type DeleteGroupMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteGroupMutation = (
  { __typename?: 'mutation_root' }
  & { delete_groups_by_pk?: Maybe<(
    { __typename?: 'groups' }
    & Pick<Groups, 'name' | 'id' | 'days' | 'date'>
  )> }
);

export type UpdateAttendanceMutationVariables = Exact<{
  id: Scalars['Int'];
  object: Attendance_Set_Input;
}>;


export type UpdateAttendanceMutation = (
  { __typename?: 'mutation_root' }
  & { update_attendance_by_pk?: Maybe<(
    { __typename?: 'attendance' }
    & Pick<Attendance, 'id' | 'date' | 'attended' | 'status' | 'student_id'>
  )> }
);

export type GroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GroupsQuery = (
  { __typename?: 'query_root' }
  & { groups: Array<(
    { __typename?: 'groups' }
    & Pick<Groups, 'id' | 'name' | 'date' | 'current_month'>
  )> }
);

export type ReportDataQueryVariables = Exact<{
  fromDate: Scalars['date'];
  toDate: Scalars['date'];
}>;


export type ReportDataQuery = (
  { __typename?: 'query_root' }
  & { attendance: Array<(
    { __typename?: 'attendance' }
    & Pick<Attendance, 'id' | 'date'>
  )> }
);

export type StudentsQueryVariables = Exact<{
  date?: Maybe<Scalars['date']>;
  groupId: Scalars['Int'];
}>;


export type StudentsQuery = (
  { __typename?: 'query_root' }
  & { students: Array<(
    { __typename?: 'students' }
    & Pick<Students, 'id' | 'name'>
    & { attendances: Array<(
      { __typename?: 'attendance' }
      & Pick<Attendance, 'attended' | 'date' | 'id' | 'status'>
    )> }
  )> }
);


export const CreateAttendanceDocument = gql`
    mutation CreateAttendance($object: attendance_insert_input!) {
  insert_attendance_one(object: $object) {
    attended
    date
    id
    student_id
  }
}
    `;

export function useCreateAttendanceMutation() {
  return Urql.useMutation<CreateAttendanceMutation, CreateAttendanceMutationVariables>(CreateAttendanceDocument);
};
export const CreateGroupDocument = gql`
    mutation CreateGroup($object: groups_insert_input!) {
  insert_groups_one(object: $object) {
    id
    name
    date
  }
}
    `;

export function useCreateGroupMutation() {
  return Urql.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument);
};
export const CreateStudentDocument = gql`
    mutation CreateStudent($object: students_insert_input!) {
  insert_students_one(object: $object) {
    id
    name
  }
}
    `;

export function useCreateStudentMutation() {
  return Urql.useMutation<CreateStudentMutation, CreateStudentMutationVariables>(CreateStudentDocument);
};
export const DeleteGroupDocument = gql`
    mutation DeleteGroup($id: Int!) {
  delete_groups_by_pk(id: $id) {
    name
    id
    days
    date
  }
}
    `;

export function useDeleteGroupMutation() {
  return Urql.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument);
};
export const UpdateAttendanceDocument = gql`
    mutation UpdateAttendance($id: Int!, $object: attendance_set_input!) {
  update_attendance_by_pk(pk_columns: {id: $id}, _set: $object) {
    id
    date
    attended
    status
    student_id
  }
}
    `;

export function useUpdateAttendanceMutation() {
  return Urql.useMutation<UpdateAttendanceMutation, UpdateAttendanceMutationVariables>(UpdateAttendanceDocument);
};
export const GroupsDocument = gql`
    query Groups {
  groups {
    id
    name
    date
    current_month
  }
}
    `;

export function useGroupsQuery(options: Omit<Urql.UseQueryArgs<GroupsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GroupsQuery>({ query: GroupsDocument, ...options });
};
export const ReportDataDocument = gql`
    query ReportData($fromDate: date!, $toDate: date!) {
  attendance(where: {_and: [{date: {_gte: fromDate}}, {date: {_lte: toDate}}]}) {
    id
    date
  }
}
    `;

export function useReportDataQuery(options: Omit<Urql.UseQueryArgs<ReportDataQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ReportDataQuery>({ query: ReportDataDocument, ...options });
};
export const StudentsDocument = gql`
    query Students($date: date, $groupId: Int!) {
  students(where: {group_id: {_eq: $groupId}}) {
    attendances {
      attended
      date
      id
      status
    }
    id
    name
  }
}
    `;

export function useStudentsQuery(options: Omit<Urql.UseQueryArgs<StudentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StudentsQuery>({ query: StudentsDocument, ...options });
};

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    