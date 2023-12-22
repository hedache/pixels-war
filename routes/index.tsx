import { Head } from "$fresh/runtime.ts";
import { ColorPicker } from "../components/ColorPecker.tsx";
import { WIDTH, PIXEL_SIZE } from "../shared/constantes.ts";
import { getGrid } from '../shared/db.ts';
import { Game } from '../islands/Game.tsx';
export default async function Home() {
  const {tiles} = await getGrid()

  return (
    // <h1>Proyecto secreto pixel wars</h1>
  <>
    <Head>
      <title>pixel-wars</title>
    </Head>
    <Game initialTiles={tiles} />
  </>
  );
}
