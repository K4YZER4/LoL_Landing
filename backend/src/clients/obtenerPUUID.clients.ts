import { nombreEncoded } from "../utils/index.js";
export async function obtenerPUUID(nombre: string) {
  const nombreGame = nombre.split("#")[0];
  const nombreEncod = await nombreEncoded(nombreGame as string);
  const tagEncod = await nombreEncoded(nombre.split("#")[1] as string);
  console.log(process.env.RIOT_API_KEY);
  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nombreEncod}/${tagEncod}`;
  console.log(url);
  console.log({
    "X-Riot-Token": process.env.RIOT_API_KEY,
  });
  const resp = await fetch(url, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY as string,
    },
  });
  console.log(resp);
  if (!resp.ok) {
    throw new Error(`Error al obtener PUUID: ${resp.statusText}`);
  }
  const data = await resp.json();
  return data;
}
