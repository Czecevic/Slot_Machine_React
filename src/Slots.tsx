import React, { useRef, useState } from "react";
import "./App.css";

export const Slots: React.FC = () => {
  const [, setTextOne] = useState<string>("0");
  const [addTextOne, setAddTextOne] = useState<string[]>([]);
  const [rolling, setRolling] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [close, setClose] = useState<boolean>(false);

  const slotRefs = [useRef<HTMLDivElement>(null)];
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const input = formData.get("input")?.toString().split(",") || [];

    setError("");
    setAddTextOne((prev) => [...prev, ...input]);
    formRef.current?.reset(); // Clear the form
  };

  const roll = () => {
    if (addTextOne.length === 0) {
      setClose(!close);
      setError("Veuillez entrer des valeurs avant de lancer.");
      return;
    } else {
      setError("");
    }
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
    }, 700);

    slotRefs.forEach((slotRef, i) => {
      const selected = triggerSlotRotation(slotRef.current!, i);
      if (i === 0) setTextOne(selected);
    });
  };

  const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const triggerSlotRotation = (ref: HTMLDivElement, index: number): string => {
    if (index === 0) return "";
    else {
      const setTop = (top: number) => {
        ref.style.top = `${top}px`;
      };
      const options = ref.children;
      const randomOption = getRandomInt(0, options.length - 1);
      const choosenOption = options[randomOption] as HTMLElement;
      setTop(-choosenOption.offsetTop + 2);
      return "";
    }
  };

  return (
    <div className="SlotMachine">
      <h1 className="grandTitre">Slot Machine</h1>
      <h2>introduire vos valeurs</h2>
      <div className="valuesAndTable">
        <form className="introValues" onSubmit={handleSubmit} ref={formRef}>
          <input type="text" name="input" />
          <button type="submit">valider</button>
        </form>
        {error && (
          <div className={close === false ? "error" : "correction"}>
            <p>{error}</p>
            <button onClick={() => setClose(!close)}>oui</button>
          </div>
        )}
        <div className="tableOfElem">
          {addTextOne.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </div>
      </div>
      <div className="allSlot">
        <div className="slot">
          <section>
            <div className="container" ref={slotRefs[0]}>
              {addTextOne.map((texte, i) => (
                <div key={i}>
                  <span>{texte}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div
        className={!rolling ? "roll rolling" : "roll"}
        onClick={!rolling ? roll : undefined}
        aria-disabled={rolling}
      >
        {rolling ? "Rolling..." : "ROLL"}
      </div>
    </div>
  );
};

export default Slots;
