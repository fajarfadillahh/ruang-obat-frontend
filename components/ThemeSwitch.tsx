import { Button } from "@nextui-org/react";
import { IconContext, MoonStars, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [client, setClient] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;

  return (
    <Button
      isIconOnly
      variant="bordered"
      radius="lg"
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
    >
      <IconContext.Provider
        value={{
          weight: "bold",
          size: 20,
        }}
      >
        {theme === "light" ? <MoonStars /> : <Sun />}
      </IconContext.Provider>
    </Button>
  );
}
