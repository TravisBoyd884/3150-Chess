"use client";
import { useState } from "react";
import Piece from "./Piece";
import { useWindowDimensions } from "./window";
import classNames from "classnames";
import NoSSR from "./NoSSR";

interface Tile {
  x: number;
  y: number;
  color: string;
  name: string;
}

const startingPiece = ({ row, col }: { row: number; col: number }) => {
  // Check for pawns
  if (row === 1) return "Black-Pawn";
  if (row === 6) return "White-Pawn";
  if (row !== 0 && row !== 7) return ""; // Return empty string if not a pawn (no other pieces on the board yet)

  const pieces = [
    "Rook",
    "Knight",
    "Bishop",
    "Queen",
    "King",
    "Bishop",
    "Knight",
    "Rook",
  ];

  const color = row == 0 ? "Black-" : "White-"; // Check for color

  // Check for other pieces using table lookup
  return color + pieces[col]; // Access row-adjusted index, return empty string if not found
};

const pieces: Array<Tile> = [];
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    pieces.push({
      x: row,
      y: col,
      color: (row + col) % 2 === 0 ? "#bda27e" : "#e4d2ba",
      name: startingPiece({ row, col }),
    });
  }
}

export default function Board() {
  const { height, width } = useWindowDimensions();
  const [active, setActive] = useState<any>(null);

  const boardClass = classNames(
    "grid grid-cols-8 grid-rows-8 aspect-square border-[.5em] border-black border-solid absolute",
    {
      "h-3/4": width > height,
      "w-3/4": width < height,
    },
  );

  const renderPiece = (pieceName: string) => {
    if (pieceName != "") return <Piece src={`/${pieceName}` + ".png"} />;
    else return <></>;
  };

  const handleClick = (e: any) => {
    if (e.target.classList.contains("piece")) {
      setActive(e.target.parentElement.id);
    }
  };

  const getBg = (id: string) => {
    if (id === active) {
      console.log("id", id);
      console.log(id === active);
      return true;
    }
    return false;
  };

  return (
    <NoSSR>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className={boardClass}>
          {pieces?.map((piece) => (
            <div
              onDragOver={(e) => {
                e.preventDefault();
              }}
              id={`${piece.x}-${piece.y}`}
              key={`${piece.x}-${piece.y}`}
              style={{
                backgroundColor: `${getBg(piece.x + "-" + piece.y) ? "#7087A8" : piece.color}`,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="tile h-3/4 w-3/4"
              onClick={(e) => handleClick(e)}
            >
              {renderPiece(piece.name)}
            </div>
          ))}
        </div>
      </div>
    </NoSSR>
  );
}
