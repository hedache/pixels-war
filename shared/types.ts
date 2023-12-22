import { COLORS } from './constantes.ts';


export type Color = typeof COLORS[number]

export interface Grid {
    tiles: Color[];
    versionstamps: string[]
}