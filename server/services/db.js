var connectionString = "postgres://wwtuexqqhtrtnf:841ec5db7e3e9344ba448cb5b3af910d96380556ddded95bee399b756a1d1f45@ec2-52-213-167-210.eu-west-1.compute.amazonaws.com:5432/d2irdpqnutdjor"

pg.connect(connectionString, function(err, client, done) {
   client.query('SELECT * FROM your_table', function(err, result) {
      done();
      if(err) return console.error(err);
      console.log(result.rows);
   });
});