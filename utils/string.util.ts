export function getColorClass({
  user_answer,
  is_hesitant,
}: {
  user_answer: string;
  is_hesitant: boolean;
}) {
  if (user_answer) {
    if (is_hesitant) {
      return "bg-yellow-500 text-white";
    } else {
      return "bg-purple text-white";
    }
  } else {
    if (is_hesitant) {
      return "bg-yellow-500 text-white";
    } else {
      return "bg-gray/10 text-gray hover:bg-gray/20";
    }
  }
}
