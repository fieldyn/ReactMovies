import { Client, TablesDB, ID, Query } from "appwrite";
import type { Movie, TrendingMovie } from "./types";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
    // 1. Buscar si el termino ya existe en la base de datos
    try {
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [Query.equal('searchTerm', searchTerm)],
        });

        // 2. Si existe, incrementar el contador
        if (result.rows.length > 0) {
            const row = result.rows[0];
            await tablesDB.updateRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: row.$id,
                data: { count: row.count + 1 },
            });
        } else {
            // 3. Si no existe, crear una nueva fila con count = 1
            await tablesDB.createRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: ID.unique(),
                data: {
                    searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                },
            });
        }
    } catch (error) {
        console.error(error);
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
    try {
        const result = await tablesDB.listRows<TrendingMovie>({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [Query.limit(5), Query.orderDesc('count')],
        });

        return result.rows;
    } catch (error) {
        console.error(error);
        return [];
    }
}
