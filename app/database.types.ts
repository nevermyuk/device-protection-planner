export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  app_data: {
    Tables: {
      device_details: {
        Row: {
          additional_info: string | null;
          created_at: string | null;
          device_id: string | null;
          id: string;
          updated_at: string | null;
          warranty_period: string | null;
        };
        Insert: {
          additional_info?: string | null;
          created_at?: string | null;
          device_id?: string | null;
          id?: string;
          updated_at?: string | null;
          warranty_period?: string | null;
        };
        Update: {
          additional_info?: string | null;
          created_at?: string | null;
          device_id?: string | null;
          id?: string;
          updated_at?: string | null;
          warranty_period?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'device_details_device_id_fkey';
            columns: ['device_id'];
            isOneToOne: false;
            referencedRelation: 'devices';
            referencedColumns: ['id'];
          },
        ];
      };
      device_models: {
        Row: {
          accepted: boolean | null;
          created_at: string | null;
          id: string;
          manufacturer_id: string | null;
          model: string;
          release_date: string | null;
          updated_at: string | null;
        };
        Insert: {
          accepted?: boolean | null;
          created_at?: string | null;
          id?: string;
          manufacturer_id?: string | null;
          model: string;
          release_date?: string | null;
          updated_at?: string | null;
        };
        Update: {
          accepted?: boolean | null;
          created_at?: string | null;
          id?: string;
          manufacturer_id?: string | null;
          model?: string;
          release_date?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'device_models_manufacturer_id_fkey';
            columns: ['manufacturer_id'];
            isOneToOne: false;
            referencedRelation: 'manufacturers';
            referencedColumns: ['id'];
          },
        ];
      };
      device_types: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          type_name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          type_name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          type_name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      devices: {
        Row: {
          created_at: string | null;
          device_model_id: string | null;
          id: string;
          name: string;
          purchase_date: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          device_model_id?: string | null;
          id?: string;
          name: string;
          purchase_date: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          device_model_id?: string | null;
          id?: string;
          name?: string;
          purchase_date?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'devices_device_model_id_fkey';
            columns: ['device_model_id'];
            isOneToOne: false;
            referencedRelation: 'device_models';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'devices_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      manufacturers: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      plan_types: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          type_name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          type_name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          type_name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      protection_plans: {
        Row: {
          coverage_details: string | null;
          created_at: string | null;
          device_id: string | null;
          expiration_date: string;
          id: string;
          plan_type_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          coverage_details?: string | null;
          created_at?: string | null;
          device_id?: string | null;
          expiration_date: string;
          id?: string;
          plan_type_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          coverage_details?: string | null;
          created_at?: string | null;
          device_id?: string | null;
          expiration_date?: string;
          id?: string;
          plan_type_id?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'protection_plans_device_id_fkey';
            columns: ['device_id'];
            isOneToOne: false;
            referencedRelation: 'devices';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'protection_plans_plan_type_id_fkey';
            columns: ['plan_type_id'];
            isOneToOne: false;
            referencedRelation: 'plan_types';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  next_auth: {
    Tables: {
      accounts: {
        Row: {
          access_token: string | null;
          expires_at: number | null;
          id: string;
          id_token: string | null;
          oauth_token: string | null;
          oauth_token_secret: string | null;
          provider: string;
          providerAccountId: string;
          refresh_token: string | null;
          scope: string | null;
          session_state: string | null;
          token_type: string | null;
          type: string;
          userId: string | null;
        };
        Insert: {
          access_token?: string | null;
          expires_at?: number | null;
          id?: string;
          id_token?: string | null;
          oauth_token?: string | null;
          oauth_token_secret?: string | null;
          provider: string;
          providerAccountId: string;
          refresh_token?: string | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type: string;
          userId?: string | null;
        };
        Update: {
          access_token?: string | null;
          expires_at?: number | null;
          id?: string;
          id_token?: string | null;
          oauth_token?: string | null;
          oauth_token_secret?: string | null;
          provider?: string;
          providerAccountId?: string;
          refresh_token?: string | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type?: string;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'accounts_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      sessions: {
        Row: {
          expires: string;
          id: string;
          sessionToken: string;
          userId: string | null;
        };
        Insert: {
          expires: string;
          id?: string;
          sessionToken: string;
          userId?: string | null;
        };
        Update: {
          expires?: string;
          id?: string;
          sessionToken?: string;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'sessions_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          email: string | null;
          emailVerified: string | null;
          id: string;
          image: string | null;
          name: string | null;
        };
        Insert: {
          email?: string | null;
          emailVerified?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
        };
        Update: {
          email?: string | null;
          emailVerified?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
        };
        Relationships: [];
      };
      verification_tokens: {
        Row: {
          expires: string;
          identifier: string | null;
          token: string;
        };
        Insert: {
          expires: string;
          identifier?: string | null;
          token: string;
        };
        Update: {
          expires?: string;
          identifier?: string | null;
          token?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      uid: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
