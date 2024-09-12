import { Button } from "@nextui-org/react";
import { CursorClick } from "@phosphor-icons/react";

export default function HomePage() {
  return (
    <div className="grid justify-center gap-4 text-center">
      <h4 className="text-[64px] font-bold text-foreground">Home Page</h4>
      <Button
        variant="solid"
        startContent={<CursorClick weight="bold" size={16} />}
        className="bg-secondary font-bold text-white"
      >
        Click me
      </Button>
    </div>
  );
}
