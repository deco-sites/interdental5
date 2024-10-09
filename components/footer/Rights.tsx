export interface RightsContent {
  phrase: string;
}

export interface RightsProps {
  content: RightsContent;
}

export default function Rights({ content: { phrase = "" } }: RightsProps) {
  return (
    <div className="text-center text-[#000] text-xs">
      {phrase}
    </div>
  );
}
