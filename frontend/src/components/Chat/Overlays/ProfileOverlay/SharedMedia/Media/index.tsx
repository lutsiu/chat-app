interface Props {
  media: { title: string; media: string[] }[];
  
}

export default function Media(props: Props) {
  const { media } = props;
  return (
    <div className="min-w-full flex-1" >
      {media.map((mediaObj, i) => {
        return (
          <div key={i}>
            <h3 className="text-2xl font-medium text-gray-300 ml-[2rem] mt-[1rem]">
              {mediaObj.title}
            </h3>
            <ul className="mt-[1rem] grid grid-cols-3 gap-[0.2rem]">
              {mediaObj.media.map((media, i) => {
                console.log(100 / mediaObj.media.length);
                return (
                  <li key={i} className="h-[12rem]">
                    <img
                      src={media}
                      alt="img"
                      className="object-cover h-full w-full"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
