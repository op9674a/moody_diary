class Moody_Diary

    attr_reader :id, :mood, :activity, :food, :activitywant, :foodwant, :grateful, :date

    if (ENV['DATABASE_URL'])
   uri = URI.parse(ENV['DATABASE_URL'])
   DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
  else
    DB = PG.connect(host: "", port: 5432, dbname: 'moody_diary_development')
  end

    def initialize(opts)
        @id = opts["id"].to_i
        @mood = opts["mood"]
        @activity = opts["activity"]
        @food = opts["food"]
        @activitywant = opts["activitywant"]
        @foodwant = opts["foodwant"]
        @grateful = opts["grateful"]
        @date = opts["date"]
    end

    def self.all
        results = DB.exec("SELECT * FROM records;")
        return results.map {|result| Record.new(result) }
    end

    def self.find(id)
        results = DB.exec("SELECT * FROM records WHERE id=#{id};")
        return Record.new(results.first)
    end

    def self.create(opts)
        results = DB.exec(
            <<-SQL
                INSERT INTO records (mood, activity, food, activitywant, foodwant, grateful, date)
                VALUES ( '#{opts["mood"]}',
                         '#{opts["activity"]}',
                         '#{opts["food"]}',
                         '#{opts["activitywant"]}',
                         '#{opts["foodwant"]}',
                         '#{opts["grateful"]}',
                         '#{opts["date"]}'
                     )
                RETURNING id, mood, activity, food, activitywant, foodwant, grateful, date;
                SQL
            )
            return Record.new(results.first)
    end

    def self.delete(id)
        results = DB.exec("DELETE FROM records WHERE id=#{id};")
        return { deleted: true }
    end

    def self.update(id, opts)
        results = DB.exec(
            <<-SQL
                UPDATE records
                SET
                 mood='#{opts["mood"]}',
                 activity='#{opts["activity"]}',
                 food='#{opts["food"]}',
                 activitywant='#{opts["activitywant"]}',
                 foodwant='#{opts["foodwant"]}',
                 grateful='#{opts["grateful"]}',
                 date='#{opts["date"]}'
                WHERE id=#{id}
                RETURNING id, mood, activity, food, activitywant, foodwant, grateful, date;
            SQL
        )
        return Moody_Diary.new(results.first)
    end

end
