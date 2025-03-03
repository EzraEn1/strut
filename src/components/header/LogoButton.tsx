"use strict";

import Button from "../../widgets/Button";
import DropdownButton from "../../widgets/DropdownButton";
const Options = DropdownButton.Options;

import "styles/components/Header.css";
import Css from "../../html/Css";
import { Deck } from "../../domain/schema";
import { CtxAsync as Ctx } from "@vlcn.io/react";
import queries from "../../domain/queries";
import mutations from "../../domain/mutations";
import { IID_of } from "../../id";

function LogoButton({ ctx, deckId }: { ctx: Ctx; deckId: IID_of<Deck> }) {
  const canUndo = queries.canUndo(ctx, deckId).data;
  const canRedo = queries.canRedo(ctx, deckId).data;

  return (
    <DropdownButton className="strt-logo-button">
      <Button className="btn-outline-warning dropdown-toggle">
        <span className="bg"></span>
      </Button>
      <Options>
        <li>
          <a
            className={Css.toClassString({
              "dropdown-item": true,
              disabled: !canUndo,
            })}
            href="#!"
            onClick={() => mutations.undo(ctx.db, deckId)}
          >
            Undo
          </a>
        </li>
        <li>
          <a
            className={Css.toClassString({
              "dropdown-item": true,
              disabled: !canRedo,
            })}
            href="#!"
            onClick={() => mutations.redo(ctx.db, deckId)}
          >
            Redo
          </a>
        </li>
      </Options>
    </DropdownButton>
  );
}

export default LogoButton;
