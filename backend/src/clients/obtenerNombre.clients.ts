export async function obtenerNombre(puuid: string) {
  const url = `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
  const resp = await fetch(url, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY as string,
    },
  });
  if (!resp.ok) {
    throw new Error(`Error al obtener nombre: ${resp.statusText}`);
  }
  const data = await resp.json();
  return data;
}
