//TODO: Hook this into insterts to auto increment id's
db.createCollection("counters");
db.counter.insert({_id:"tid",sequence_value:0});

function getNextSequenceValue(sequenceName){
    var sequenceDocument = db.counters.findAndModify({
    query:{_id: sequenceName },
    update: {$inc:{sequence_value:1}},
    new:true
      });
  return sequenceDocument.sequence_value;
};
