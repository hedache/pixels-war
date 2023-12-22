import { Head } from "$fresh/runtime.ts";
import { ColorPicker } from "../components/ColorPecker.tsx";
import { Tiles } from "../components/Tiles.tsx";
import { COLORS, PIXEL_SIZE, WIDTH } from "../shared/constantes.ts";
import { Color, Grid as GridType } from '../shared/types.ts';
import { useSignal } from '@preact/signals'
// import { Tiles } from '../components/Tiles.tsx';


export function Game(
{ initialTiles } : { initialTiles: Color[] },

) {
    const selected = useSignal<Color>(COLORS[0])
    const grid = useSignal<Color[]>(initialTiles)

    return (
    <>
  

        <Tiles grid={grid} selectedColor={selected.value} />
        <ColorPicker selected={selected} />
  
    </>
    )

    
}