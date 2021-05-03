package com.example.demo.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.example.demo.model.Coaster;
import com.example.demo.model.Design;
import com.example.demo.model.Location;
import com.example.demo.model.Status;
import com.example.demo.model.Typ;

import lombok.Getter;

@Getter
@Service
public class RcdbScraper {
	
	private Map<String, Location> locations = new HashMap<>();
	private Map<String, Typ> typs = new HashMap<>();
	private Map<String, Design> designs = new HashMap<>();
	private Map<String, Status> status = new HashMap<>();
	
	public List<Coaster> scrape(int from, int to) {
		return IntStream.range(from, to) //
				.parallel() //
				.mapToObj(this::loadPage) //
				.flatMap(this::parseCoasters) //
				// .peek(c -> System.out.println(c)) //
				.collect(Collectors.toList());

	}

	private String loadPage(final int page) {
		try {
			final String url = "https://rcdb.com/r.htm?page=" + page + "&ot=2&cs=277";
			final URLConnection connection = new URL(url).openConnection();
			connection.setRequestProperty("User-Agent",
					"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11");
			connection.connect();

			final BufferedReader r = new BufferedReader(
					new InputStreamReader(connection.getInputStream(), Charset.forName("UTF-8")));

			final StringBuilder sb = new StringBuilder();
			String line;
			while ((line = r.readLine()) != null) {
				sb.append(line);
			}
			return sb.toString();
		} catch (IOException e) {
			System.err.println(e);
			return null;
		}
	}
	
	/**
	 * 1 costerId <br>
	 * 2 costerName <br>
	 * 3 locationId <br>
	 * 4 locationName <br>
	 * 5 typId <br>
	 * 6 typeName <br>
	 * 7 designId <br>
	 * 8 designName <br>
	 * 11|13 statusId <br>
	 * 14 statusName <br>
	 * 17 opened
	 */
	private final static Pattern linePattern = Pattern.compile(
			"\\<tr\\>\\<td\\>.+?<td\\>\\<a\\s+href\\=\\/(\\d+)\\.htm\\>([^\\<]+)\\<\\/a\\>"
		    + "\\<td\\>\\<a\\s+href\\=\\/(\\d+)\\.htm\\>([^\\<]+)\\<\\/a\\>"
			+ "\\<td\\>\\<a\\s+href\\=\\\"\\/g\\.htm\\?id=(\\d+)\\\"\\>([^\\<]+)\\<\\/a\\>"
			+ "\\<td\\>\\<a\\s+href\\=\\\"\\/g\\.htm\\?id=(\\d+)\\\"\\>([^\\<]+)\\<\\/a\\>"
			+ "\\<td\\>"
			+ "(<a\\s+href\\=(\\\"\\/g\\.htm\\?id=(\\d+)\\\")?"
			+ "(\\/(\\d+)\\.htm)?"
			+ "\\>([^\\<]+)\\<\\/a\\>)?\\-?"
			+ "\\<td\\>(([^\\<]*\\<time\\s+datetime=\\\"([^\\<]+)\\\"\\>\\<\\/time\\>)|\\-)",
			Pattern.MULTILINE | Pattern.COMMENTS);

	private Stream<Coaster> parseCoasters(final String pageContent) {
		List<Coaster> out = new ArrayList<>();
		final Matcher matcher = linePattern.matcher(pageContent);
		while (matcher.find()) {
			final Coaster c = new Coaster();
			c.setId(Integer.parseInt(matcher.group(1)));
			c.setName(matcher.group(2).substring(0, Math.min(matcher.group(2).length(), 15)));
			c.setOpenedDate(matcher.group(17));
			c.setLocation(getLocation(Integer.parseInt(matcher.group(3)), matcher.group(4)));
			c.setTyp(getTyp(Integer.parseInt(matcher.group(5)), matcher.group(6)));
			c.setDesign(getDesign(Integer.parseInt(matcher.group(7)), matcher.group(8)));
			
			String statusId = matcher.group(11) == null ? matcher.group(13) : matcher.group(11);
			if (statusId != null) {
				c.setStatus(getStatus(Integer.parseInt(statusId), matcher.group(14)));
			}

			out.add(c);
		}

		return out.stream();
	}

	private Location getLocation(final int id, final String name) {
		return locations.computeIfAbsent(name, n -> {
			Location e = new Location();
			e.setName(n);
			return e;
		});
	}

	private Typ getTyp(final int id, final String name) {
		return typs.computeIfAbsent(name, n -> {
			Typ e = new Typ();
			e.setName(n);
			return e;
		});
	}

	private Design getDesign(final int id, final String name) {
		return designs.computeIfAbsent(name, n -> {
			Design e = new Design();
			e.setName(n);
			return e;
		});
	}

	private Status getStatus(final int id, final String name) {
		return status.computeIfAbsent(name, n -> {
			Status e = new Status();
			e.setName(n);
			return e;
		});
	}
	
	
}
