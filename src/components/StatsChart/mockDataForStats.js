// At the end of a week, we will delete all the record data (Sunday?)

let cycles = [
  {
    createdAt: 'Tue, 1 Mar 2022 19:00:00 PST',
    createdBy: '621d611b46ce513d0381a0f6',
    finishedAt: 'Tue, 1 Mar 2022 20:00:00 PST',
    doneBy: ['621d611b46ce513d0381a0f6', '621d611b46ce513d0381a0f6']
  }
];

let user = {
  id: 'aaa',
  cycles: [
    {
      createdAt: 'Tue, 1 Mar 2022 19:00:00 PST',
      createdBy: '621d611b46ce513d0381a0f6',
      finishedAt: 'Tue, 1 Mar 2022 20:00:00 PST',
      doneBy: ['621d611b46ce513d0381a0f6', '621d611b46ce513d0381a0f6']
    }
  ]
};

/* If one cycle finishes, it pushes a cycle to cycles array */

/*  */