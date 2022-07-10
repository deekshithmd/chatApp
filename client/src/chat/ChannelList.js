import React from "react";
import { Channel } from "./Channel";

export const ChannelList = (props) => {
  let list = `There is no channels to show`;
  //   console.log("props", props.channels);
  //   if (props.channels) {
  //     list = props.channels?.map((c) => (
  //       <Channel
  //         key={c.id}
  //         id={c.id}
  //         name={c.name}
  //         participants={c.participants}
  //       ></Channel>
  //     ));
  //   }

  //   return <div className="channel-list">{list}</div>;

  //   const handleClick = (id) => {
  //     props.onSelectChannel(id);
  //   };

  return (
    <>
      {props?.channels?.map((c, i) => {
        return (
          i < 2 && (
            <Channel
              key={c.id}
              id={c.id}
              name={c.name}
              participants={c.participants}
              onSelect={props.onSelectChannel}
            />
          )
        );
      })}
    </>
  );
};
