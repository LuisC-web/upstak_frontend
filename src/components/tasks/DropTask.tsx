import { useDroppable } from "@dnd-kit/core";

type DropTaskProps = {
  status: string;
};
function DropTask({ status }: DropTaskProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });
  const style = {
    opacity: isOver ? 0.4 : undefined,
  };
  return (
    <div
      className={`text-xs font-semibold uppercase p-2 border-dashed border-slate-500 mt-5 gird place-content-center border text-slate-500 rounded-sm`}
      style={style}
      ref={setNodeRef}
    >
      Soltar tarea aquí
    </div>
  );
}

export default DropTask;
