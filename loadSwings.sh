aws dynamodb put-item \
    --table-name GolfSwingMetrics \
    --item '{
        "playerId": {"S": "player1"},
        "timestamp": {"N": "1620000000000"},
        "windSpeed": {"N": "10"},
        "elevation": {"N": "2"},
        "targetSurface": {"N": "0"},
        "greenSpeed": {"N": "9"},
        "yaw": {"N": "1.2"},
        "windDirection": {"N": "1"},
        "ballSpin": {"N": "-3"},
        "powerMeter": {"N": "85"},
        "rollDistance": {"N": "20"},
        "ballBrand": {"S": "nike"},
        "stickBrand": {"S": "titlest"},
        "stick": {"N": "10"},
        "teed": {"N": "0"}
    }'