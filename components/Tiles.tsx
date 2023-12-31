import { Signal } from "@preact/signals";
import { PIXEL_SIZE, WIDTH } from "../shared/constantes.ts";
import { Color, Grid } from '../shared/types.ts';
import { useEffect } from "preact/hooks";


export function Tiles ({
    grid, selectedColor
} : {
    grid: Signal<Color[]>,
    selectedColor: Color,
}) {

  useEffect(() => {
    const eventSource = new EventSource('/api/listen');

    eventSource.onmessage = (event) => {
      const { index, color } = JSON.parse(event.data);
      const gridValue = grid.value;
      grid.value = gridValue.with(index, color);
    };

    return () => eventSource.close();
  }, []);

   const updateGrid = async ( index: number, selectedColor: Color ) => {

    const response = await fetch("/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index, color: selectedColor }),
    });

    if(!response.ok) {
      console.log("failed to updated grid");
      return;
    }

    const {versionstamp} : {versionstamp: string} = await response.json();

    const gridValue = grid.value;
    grid.value = gridValue.with(index, selectedColor)
   }
    return (

        <div
        className="grid"
        style={`
        width: ${WIDTH * PIXEL_SIZE}px;
        grid-template-columns: repeat(${WIDTH}, 1fr);
        `}
      >
  
        {grid.value.map((color, index) => (
          <div
            style={`
              width: ${PIXEL_SIZE}px;
              height: ${PIXEL_SIZE}px;
              background-color: ${color}
            `}
            onClick={() => {
              console.log('click ');
              updateGrid(index, selectedColor);
              // const gridValue = grid.value;

              // // nueva
              // // modificar un array pero creando una copia
              // grid.value = gridValue.with(index, selectedColor)

              // vieja
              // gridValue[index] = selectedColor;
              // grid.value = [ ...gridValue ]; // un nuevo array para que se actualice el signal

            }}


          >
  
          </div>
        ))}
  
  
  
      </div>

    )
}