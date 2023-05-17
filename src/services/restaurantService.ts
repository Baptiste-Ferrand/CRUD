// function call base de donnee avec le ,ethod CRUD ---> METHODS
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://levcaphemaodbyzsjbda.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxldmNhcGhlbWFvZGJ5enNqYmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMzODg5MzYsImV4cCI6MTk5ODk2NDkzNn0.LM5sSmRd7uQHAIMl0h51W--oTHDqVhaeU_LYVgqU1kE"
);

type Restaurant = {
  id: number;
  name: string;
  address: string;
  note: number;
};

export async function getAllRestaurants(): Promise<Restaurant[]> {
  const { data, error } = await supabase.from("restaurant").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data?.map(mapToRestaurant) ?? [];
}

export async function getRestaurantById(id: any) {
  try {
    const { data } = await supabase.from("restaurant").select("*").eq("id", id);
    return data;
  } catch (error) {
    return error;
  }
}

export async function createNewRestaurant(
  name: string,
  address: string,
  note: number
) {
  console.log(
    name,
    address,
    note,
    "les query envoyer a la bdd pour creer resto"
  );

  try {
    const error = await supabase.from("restaurant").insert({
      name,
      address,
      note,
    });
    return "created";
  } catch (error) {
    return error;
  }
}

export async function deleteRestaurantById(id: any) {
  try {
    const error = await supabase.from("restaurant").delete().eq("id", id);
    console.log(error, "error");

    if (error) {
      return error;
    } else {
      return "deleted restaurant : " + id;
    }
  } catch (error) {
    return error;
  }
}

export async function updateRestaurantById(
  id: string,
  name: string,
  address: string,
  note: number
) {
  try {
    const data = await supabase
      .from("restaurant")
      .update({ name, address, note })
      .eq("id", id);
    console.log(data, "retours des data dans le service");

    return data;
  } catch (error) {
    console.log(error, "log error dans le service");

    return error;
  }
}

function mapToRestaurant(record: any): Restaurant {
  return {
    id: record.id,
    name: record.name,
    address: record.address,
    note: record.note,
  };
}
