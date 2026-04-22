import { nombreEncoded } from "../utils/index.js";
export async function obtenerPUUID(nombre: string) {
  const nombreGame = nombre.split("#")[0];
  const nombreEncod = await nombreEncoded(nombreGame as string);
  const tagEncod = await nombreEncoded(nombre.split("#")[1] as string);
  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nombreEncod}/${tagEncod}`;
  const resp = await fetch(url, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY as string,
    },
  });
  if (!resp.ok) {
    throw new Error(`Error al obtener PUUID: ${resp.statusText}`);
  }
  const data = await resp.json();
  const puuid = data.puuid;
  return puuid;
}
