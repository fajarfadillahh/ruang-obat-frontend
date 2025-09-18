export function getColorClass({
  user_answer,
  is_hesitant,
}: {
  user_answer: string;
  is_hesitant: boolean;
}) {
  if (user_answer) {
    if (is_hesitant) {
      return "bg-warning text-white";
    } else {
      return "bg-purple text-white";
    }
  } else {
    if (is_hesitant) {
      return "bg-warning text-white";
    } else {
      return "bg-gray/10 text-gray hover:bg-gray/20";
    }
  }
}

export function formatName(name: string): string {
  const parts: string[] = name.split(" ");
  let result: string;

  if (parts.length === 1) {
    result = parts[0];
  } else if (parts.length === 2) {
    result = `${parts[0]} ${parts[1].charAt(0)}.`;
  } else {
    result = `${parts[0]} ${parts[1].charAt(0)}. ${parts[2].charAt(0)}.`;
  }

  return result;
}

export function isUUID(str: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}
