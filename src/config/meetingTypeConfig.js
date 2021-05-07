
export const meetingTypeAry = ["启动会","例会","评审会","进度会","验收会","交流会"];


export function readMeetingNameByIndex(index)
{
  const targetIndex = index-1;
  return meetingTypeAry[targetIndex];
}

export function readMeetingTypeIndexByName(meetingName) {

  let targetMeeting = 0;
  for(let i=0;i<meetingTypeAry.length;i++)
  {
    const _meetingName = meetingTypeAry[i];
    if(_meetingName == meetingName)
    {
      targetMeeting =  i;
      break;
    }
  }
  targetMeeting +=1;//为了和后台API对应，这里+1。后台的起始索引值 = 0
  return targetMeeting;
}
