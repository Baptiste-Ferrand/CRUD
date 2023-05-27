import { createClient } from "@supabase/supabase-js";
require('dotenv').config()


const supabase = createClient(
    process.env.supabaseURL,
    process.env.supabaseKEY
);

type Contact = {
    id: number;
    title: string;
    name: string;
    adress: string;
    realAdress: string;
    departement: string;
    country: string;
    tel: string;
    email: string;
};

export async function getAllContact(): Promise<Contact[]> {
    const { data, error } = await supabase.from("contact").select("*");
    if (error) {
        throw new Error(error.message);
    }
    return data?.map(mapToRestaurant) ?? [];
}

export async function getContactById(id: any) {
    try {
        const { data } = await supabase.from("contact").select("*").eq("id", id);
        return data;
    } catch (error) {
        return error;
    }
}

export async function createNewContact(
    title: string,
    name: string,
    adress: string,
    realAdress: string,
    departement: string,
    country: string,
    tel: string,
    email: string,

) {
    console.log(
        title,
        name,
        adress,
        realAdress,
        departement,
        country,
        tel,
        email,
        "les query envoyer a la bdd pour creer contact"
    );

    try {
        const error = await supabase.from("test").insert({
            title,
            name,
            adress,
            realAdress,
            departement,
            country,
            tel,
            email,
        });
        console.log(error)
        return "created";
    } catch (error) {
        return error;
    }
}

export async function deleteContactById(id: any) {
    try {
        const {error} = await supabase.from("contact").delete().eq("id", id);
        console.log(error, "error");
        if (error) {
            return error;
        } else {
            return "deleted contact : " + id;
        }
    } catch (error) {
        return error;
    }
}

export async function updateContactById(
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

function mapToRestaurant(record: any): Contact {
    return {
        id: record.id,
        title: record.title,
        name: record.name,
        adress: record.adress,
        realAdress: record.realAdress,
        departement: record.departement,
        country: record.country,
        tel: record.tel,
        email: record.email,
    };
}
