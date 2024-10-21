import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";

import styles from "./Game.module.css";
import { Loader } from "../components";

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

interface IProps {
  currentActiveScene?: (scene_instance: Phaser.Scene) => void;
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(
  function PhaserGame({ currentActiveScene }, ref) {
    const game = useRef<Phaser.Game | null>(null!);
    const [isLoading, setIsLoading] = useState(false);

    useLayoutEffect(() => {
      if (game.current === null) {
        game.current = StartGame("game-container");

        if (typeof ref === "function") {
          ref({ game: game.current, scene: null });
        } else if (ref) {
          ref.current = { game: game.current, scene: null };
        }
      }

      return () => {
        if (game.current) {
          game.current.destroy(true);
          if (game.current !== null) {
            game.current = null;
          }
        }
      };
    }, [ref]);

    useEffect(() => {
      EventBus.on("current-scene-ready", (scene_instance: Phaser.Scene) => {
        if (currentActiveScene && typeof currentActiveScene === "function") {
          currentActiveScene(scene_instance);
        }

        if (typeof ref === "function") {
          ref({ game: game.current, scene: scene_instance });
        } else if (ref) {
          ref.current = { game: game.current, scene: scene_instance };
        }
      });
      return () => {
        EventBus.removeListener("current-scene-ready");
      };
    }, [currentActiveScene, ref]);

    const onChangeScreen = () => {
      if (game.current) {
        game.current.scale.resize(window.innerWidth, window.innerHeight);
        window.location.reload();
        setIsLoading(true);
        if (game.current.scene.scenes.length > 0) {
          // const currentScene = game.current.scene.scenes[0];
          // if (currentScene instanceof BaseScene) {
          //   currentScene.resize();
          // }
        }
      }
    };

    const _orientation =
      screen.orientation ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (screen as any).mozOrientation ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (screen as any).msOrientation;
    _orientation.addEventListener("change", () => {
      onChangeScreen();
    });

    window.addEventListener("resize", () => {
      // onChangeScreen();
    });

    window.addEventListener("load", () => setIsLoading(false));

    return isLoading ? (
      <Loader />
    ) : (
      <div id="game-container" className={styles.gameContainer}></div>
    );
  }
);
