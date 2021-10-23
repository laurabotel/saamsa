package main.java.saamsa.java;


import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.kstream.Produced;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.Topology;
import org.apache.kafka.streams.kstream.KStream;
import java.util.Properties;
import java.util.concurrent.ExecutionException;


/**
 * Hello world!
 *
 */
public class streams 
{

    
    public static void main( String[] args ) throws InterruptedException, ExecutionException
    {
        if (args.length > 2)
        {
        createTopic.main((args)); //expect boostrapserver, topic, local
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "saamsaLoadBalancer");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, args[0]);
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.Integer().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

        StreamsBuilder streamsBuilder = new StreamsBuilder();
        KStream<Integer, String> kStream = streamsBuilder.stream(args[1]);
        kStream.to(args[1] + "_balanced", Produced.with(Serdes.Integer(), Serdes.String(), new partitioner()));
        
        
        Topology topology = streamsBuilder.build();
        KafkaStreams streams = new KafkaStreams(topology, props);
        streams.start();

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            streams.close();
        }));
        
        System.out.println( "Hello World!" );}
    }
}
