function CheckBox({selected = false}) {
  return (
    <div className="flex h-[1.2rem] w-[1.2rem] items-center justify-center rounded-full border border-doveGray">
      {selected && (
        <div className="h-[0.8rem] w-[0.8rem] self-center rounded-full bg-scooter" />
      )}
    </div>
  );
}

export default CheckBox;
